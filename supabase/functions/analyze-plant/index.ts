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

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'Serviço temporariamente indisponível. Tente novamente em alguns minutos.',
          details: 'OpenAI API key não configurada' 
        }),
        { 
          status: 503, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Analyze the plant image using OpenAI Vision
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Você é um especialista em botânica que analisa plantas. Analise a imagem da planta e forneça as informações em formato JSON estruturado com os seguintes campos:
            - species: nome científico e comum da planta
            - type: categoria da planta (ex: "Planta Medicinal e Culinária")
            - health_score: pontuação de saúde de 0-100
            - hydration_status: status da hidratação (ex: "Bem hidratada", "Precisa água")
            - problems: array de problemas detectados
            - recommendations: array de recomendações de cuidado
            - climate_tips: array de dicas específicas para o clima tropical de Angola
            - uses: array de usos da planta (medicinais, culinários, etc.)
            - confidence_score: sua confiança na identificação (0-1)

            Responda APENAS com o JSON válido, sem formatação markdown.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analise esta planta e forneça as informações solicitadas:'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        max_tokens: 1500,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      return new Response(
        JSON.stringify({ 
          error: 'Serviço de análise temporariamente indisponível. Tente novamente em alguns minutos.',
          details: `OpenAI API error: ${data.error?.message || 'Unknown error'}` 
        }),
        { 
          status: 503, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const analysisText = data.choices[0].message.content;
    console.log('Raw analysis result:', analysisText);

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
        analysis: savedAnalysis,
        message: 'Análise concluída com sucesso!'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-plant function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Erro na análise da planta. Tente novamente.' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});