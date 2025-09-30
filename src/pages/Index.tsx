import { useState } from 'react';
import { ResumeForm } from '@/components/ResumeForm';
import { ResumePreview } from '@/components/ResumePreview';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText } from 'lucide-react';
import { generatePDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';
import type { ResumeData } from '@/types/resume';

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      birthDate: '',
      age: '',
      address: '',
      phone: '',
      email: '',
      additionalInfo: '',
      photo: undefined,
    },
    education: [],
    experience: [],
    courses: [],
    skills: [],
    observations: '',
  });

  const handleGeneratePDF = async () => {
    try {
      toast.loading('Gerando PDF...');
      await generatePDF('resume-preview', `curriculo-${resumeData.personalInfo.name || 'novo'}.pdf`);
      toast.dismiss();
      toast.success('PDF gerado com sucesso!');
    } catch (error) {
      toast.dismiss();
      toast.error('Erro ao gerar PDF. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Gerador de Currículos Profissionais
          </h1>
          <p className="text-muted-foreground">
            Crie seu currículo profissional de forma rápida e fácil
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <Button onClick={handleGeneratePDF} size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Baixar PDF
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="form">
              <FileText className="h-4 w-4 mr-2" />
              Formulário
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Download className="h-4 w-4 mr-2" />
              Pré-visualização
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="mt-6">
            <div className="max-w-4xl mx-auto">
              <ResumeForm data={resumeData} onChange={setResumeData} />
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <div className="flex justify-center overflow-x-auto pb-8">
              <ResumePreview data={resumeData} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
