import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { GoogleGenerativeAI } from "npm:@google/generative-ai";

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

    // Initialize Gemini AI with the provided API key
    const genAI = new GoogleGenerativeAI('AIzaSyAlBA4BGzUpc_mHmLDxXc04UqPc1fSL3Lc');
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // Fetch the image and convert to base64
    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();
    const imageBase64 = await blobToBase64(imageBlob);

    // Prepare the prompt
    const prompt = `Você é um especialista em botânica que analisa plantas. Analise a imagem da planta e forneça as informações em formato JSON estruturado com os seguintes campos:
    - species: nome científico e comum da planta
    - type: categoria da planta (ex: "Planta Medicinal e Culinária")
    - health_score: pontuação de saúde de 0-100
    - hydration_status: status da hidratação (ex: "Bem hidratada", "Precisa água")
    - problems: array de problemas detectados
    - recommendations: array de recomendações de cuidado
    - climate_tips: array de dicas específicas para o clima tropical de Angola
    - uses: array de usos da planta (medicinais, culinários, etc.)
    - confidence_score: sua confiança na identificação (0-1)

    Responda APENAS com o JSON válido, sem formatação markdown.`;

    // Analyze image with Gemini
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64
        }
      }
    ]);

    const response = await result.response;
    const analysisText = response.text();

    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch (parseError) {
      console.error('Error parsing analysis JSON:', parseError);
      console.error('Raw text:', analysisText);
      throw new Error('Failed to parse analysis result');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
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

// Helper function to convert Blob to base64
async function blobToBase64(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}