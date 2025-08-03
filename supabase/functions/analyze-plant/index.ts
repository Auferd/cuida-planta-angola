import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, userId } = await req.json();

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: 'Image URL is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log('Analyzing plant for user:', userId);
    console.log('Image URL:', imageUrl);

    // Fetch the image and convert to base64
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.status}`);
    }
    
    const imageBlob = await imageResponse.blob();
    console.log('Image blob size:', imageBlob.size, 'bytes');
    console.log('Image blob type:', imageBlob.type);
    
    const imageBase64 = await blobToBase64(imageBlob);
    console.log('Base64 length:', imageBase64.length);
    console.log('Base64 start:', imageBase64.substring(0, 50));
    
    // Validate base64
    if (!imageBase64 || imageBase64.length < 100) {
      throw new Error('Invalid base64 conversion');
    }

    // Send image to String.com webhook for analysis
    console.log('Sending image to String.com for analysis...');
    const stringResponse = await fetch('https://eocxll8fjxb5rny.m.pipedream.net', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageBase64
      })
    });

    if (!stringResponse.ok) {
      throw new Error(`String.com API error: ${stringResponse.status}`);
    }

    const stringResult = await stringResponse.json();
    console.log('String.com response:', stringResult);

    // Map String.com response to our format
    const analysis = {
      species: stringResult.plant_identification?.primary_match?.plant_name || 'Planta não identificada',
      type: stringResult.plant_identification?.primary_match?.scientific_name || 'Tipo desconhecido',
      health_score: 85, // Default value since String.com doesn't provide health score
      hydration_status: 'Estado normal', // Default value
      problems: stringResult.plant_identification?.diseases_detected > 0 ? ['Possíveis problemas detectados'] : [],
      recommendations: ['Mantenha em local bem iluminado', 'Regue moderadamente'],
      climate_tips: ['Adequada para clima tropical de Angola', 'Proteja do vento forte'],
      uses: ['Decorativa'],
      confidence_score: (stringResult.plant_identification?.primary_match?.confidence || 50) / 100,
    };

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://tithbqxdoaegpnwnqtej.supabase.co';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpdGhicXhkb2FlZ3Bud25xdGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjk2MzgsImV4cCI6MjA2OTY0NTYzOH0.OrHqr21go-z4Yk2j9RKs3BfGA3Mw2gQezrge4XZnmIY';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save the analysis to database
    const { data: savedAnalysis, error: saveError } = await supabase
      .from('plant_analyses')
      .insert({
        user_id: userId,
        image_url: imageUrl,
        species: analysis.species,
        type: analysis.type,
        health_score: analysis.health_score,
        hydration_status: analysis.hydration_status,
        problems: analysis.problems,
        recommendations: analysis.recommendations,
        climate_tips: analysis.climate_tips,
        uses: analysis.uses,
        confidence_score: analysis.confidence_score,
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving analysis:', saveError);
      throw new Error('Failed to save analysis to database');
    }

    console.log('Analysis saved successfully:', savedAnalysis.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis: savedAnalysis 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Ocorreu um erro ao analisar a planta. Tente novamente.',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Helper function to convert Blob to base64 (more reliable method)
async function blobToBase64(blob: Blob): Promise<string> {
  try {
    // Method 1: Using arrayBuffer and btoa (more reliable for Deno)
    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    
    // Convert to base64 in chunks to avoid call stack issues with large images
    const chunkSize = 8192;
    let binary = '';
    
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.slice(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    
    const base64 = btoa(binary);
    console.log('Base64 conversion successful, length:', base64.length);
    
    return base64;
  } catch (error) {
    console.error('Error in blobToBase64:', error);
    throw new Error('Failed to convert image to base64');
  }
}