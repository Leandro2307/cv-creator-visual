import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Upload } from 'lucide-react';
import type { ResumeData, Education, Experience, Course } from '@/types/resume';
import { toast } from 'sonner';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeForm = ({ data, onChange }: ResumeFormProps) => {
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(data.personalInfo.photo);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('A foto deve ter no máximo 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        onChange({
          ...data,
          personalInfo: { ...data.personalInfo, photo: result },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      course: '',
      period: '',
    };
    onChange({ ...data, education: [...data.education, newEducation] });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter(e => e.id !== id) });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map(e => (e.id === id ? { ...e, [field]: value } : e)),
    });
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      period: '',
    };
    onChange({ ...data, experience: [...data.experience, newExperience] });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(e => e.id !== id) });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map(e => (e.id === id ? { ...e, [field]: value } : e)),
    });
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: '',
      institution: '',
      year: '',
    };
    onChange({ ...data, courses: [...data.courses, newCourse] });
  };

  const removeCourse = (id: string) => {
    onChange({ ...data, courses: data.courses.filter(c => c.id !== id) });
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    onChange({
      ...data,
      courses: data.courses.map(c => (c.id === id ? { ...c, [field]: value } : c)),
    });
  };

  const addSkill = () => {
    onChange({ ...data, skills: [...data.skills, ''] });
  };

  const removeSkill = (index: number) => {
    onChange({ ...data, skills: data.skills.filter((_, i) => i !== index) });
  };

  const updateSkill = (index: number, value: string) => {
    onChange({
      ...data,
      skills: data.skills.map((s, i) => (i === index ? value : s)),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dados Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={data.personalInfo.name}
                onChange={(e) =>
                  onChange({
                    ...data,
                    personalInfo: { ...data.personalInfo, name: e.target.value },
                  })
                }
                placeholder="João da Silva"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">Foto 3x4</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('photo')?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {photoPreview ? 'Alterar Foto' : 'Upload Foto'}
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de Nascimento *</Label>
              <Input
                id="birthDate"
                value={data.personalInfo.birthDate}
                onChange={(e) =>
                  onChange({
                    ...data,
                    personalInfo: { ...data.personalInfo, birthDate: e.target.value },
                  })
                }
                placeholder="01/01/1990"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Idade *</Label>
              <Input
                id="age"
                value={data.personalInfo.age}
                onChange={(e) =>
                  onChange({
                    ...data,
                    personalInfo: { ...data.personalInfo, age: e.target.value },
                  })
                }
                placeholder="33 anos"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Endereço Completo *</Label>
            <Input
              id="address"
              value={data.personalInfo.address}
              onChange={(e) =>
                onChange({
                  ...data,
                  personalInfo: { ...data.personalInfo, address: e.target.value },
                })
              }
              placeholder="Rua Example, 123 - Bairro - Cidade/UF - CEP 00000-000"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                value={data.personalInfo.phone}
                onChange={(e) =>
                  onChange({
                    ...data,
                    personalInfo: { ...data.personalInfo, phone: e.target.value },
                  })
                }
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={data.personalInfo.email}
                onChange={(e) =>
                  onChange({
                    ...data,
                    personalInfo: { ...data.personalInfo, email: e.target.value },
                  })
                }
                placeholder="joao@email.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Informações Adicionais</Label>
            <Input
              id="additionalInfo"
              value={data.personalInfo.additionalInfo}
              onChange={(e) =>
                onChange({
                  ...data,
                  personalInfo: { ...data.personalInfo, additionalInfo: e.target.value },
                })
              }
              placeholder="Ex: CNH B, Disponibilidade imediata"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Formação Acadêmica</CardTitle>
          <Button type="button" onClick={addEducation} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={edu.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Formação {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Instituição</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="Nome da Instituição"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Curso</Label>
                  <Input
                    value={edu.course}
                    onChange={(e) => updateEducation(edu.id, 'course', e.target.value)}
                    placeholder="Nome do Curso"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Período</Label>
                <Input
                  value={edu.period}
                  onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                  placeholder="2015 - 2019"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Experiência Profissional</CardTitle>
          <Button type="button" onClick={addExperience} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Experiência {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="Nome da Empresa"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cargo</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    placeholder="Cargo ocupado"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Período</Label>
                <Input
                  value={exp.period}
                  onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                  placeholder="Jan/2020 - Dez/2023"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Cursos</CardTitle>
          <Button type="button" onClick={addCourse} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.courses.map((course, index) => (
            <div key={course.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Curso {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCourse(course.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Nome do Curso</Label>
                <Input
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  placeholder="Nome do Curso"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Instituição</Label>
                  <Input
                    value={course.institution}
                    onChange={(e) => updateCourse(course.id, 'institution', e.target.value)}
                    placeholder="Nome da Instituição"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ano</Label>
                  <Input
                    value={course.year}
                    onChange={(e) => updateCourse(course.id, 'year', e.target.value)}
                    placeholder="2023"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Habilidades</CardTitle>
          <Button type="button" onClick={addSkill} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
                placeholder="Ex: Excel Avançado, Inglês Fluente, etc."
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSkill(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Observações</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.observations}
            onChange={(e) => onChange({ ...data, observations: e.target.value })}
            placeholder="Informações adicionais relevantes..."
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );
};
