-- Create table for plant analyses
CREATE TABLE public.plant_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  image_url TEXT NOT NULL,
  species TEXT,
  type TEXT,
  health_score INTEGER CHECK (health_score >= 0 AND health_score <= 100),
  hydration_status TEXT,
  problems TEXT[],
  recommendations TEXT[],
  climate_tips TEXT[],
  uses TEXT[],
  confidence_score FLOAT CHECK (confidence_score >= 0 AND confidence_score <= 1),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.plant_analyses ENABLE ROW LEVEL SECURITY;

-- Create policies for plant analyses
CREATE POLICY "Users can view their own analyses" 
ON public.plant_analyses 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own analyses" 
ON public.plant_analyses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analyses" 
ON public.plant_analyses 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analyses" 
ON public.plant_analyses 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create storage bucket for plant images
INSERT INTO storage.buckets (id, name, public) VALUES ('plant-images', 'plant-images', false);

-- Create policies for plant image uploads
CREATE POLICY "Users can view their own plant images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'plant-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own plant images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'plant-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own plant images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'plant-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own plant images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'plant-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_plant_analyses_updated_at
BEFORE UPDATE ON public.plant_analyses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();