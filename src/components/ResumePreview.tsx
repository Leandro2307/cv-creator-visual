import type { ResumeData } from '@/types/resume';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  return (
    <div
      id="resume-preview"
      className="bg-white text-black p-12 shadow-lg mx-auto"
      style={{
        width: '210mm',
        minHeight: '297mm',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header with Personal Info and Photo */}
      <div className="flex justify-between items-start mb-6">
        {/* Personal Info - Left Side */}
        <div className="flex-1 pr-4">
          <h1 className="text-2xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
            {data.personalInfo.name || 'SEU NOME COMPLETO'}
          </h1>
          <div className="space-y-1 text-sm">
            <p>
              <strong>Data de Nascimento:</strong> {data.personalInfo.birthDate || '__/__/____'}{' '}
              - <strong>Idade:</strong> {data.personalInfo.age || '__'}
            </p>
            <p>
              <strong>Endereço:</strong> {data.personalInfo.address || 'Seu endereço completo'}
            </p>
            <p>
              <strong>Telefone:</strong> {data.personalInfo.phone || '(00) 00000-0000'}
            </p>
            <p>
              <strong>E-mail:</strong> {data.personalInfo.email || 'seu@email.com'}
            </p>
            {data.personalInfo.additionalInfo && (
              <p className="pt-1">{data.personalInfo.additionalInfo}</p>
            )}
          </div>
        </div>

        {/* Photo - Right Side */}
        <div className="flex-shrink-0">
          {data.personalInfo.photo ? (
            <img
              src={data.personalInfo.photo}
              alt="Foto"
              className="w-32 h-40 object-cover border-2"
              style={{ borderColor: '#1e3a8a' }}
            />
          ) : (
            <div
              className="w-32 h-40 border-2 flex items-center justify-center text-xs text-center p-2"
              style={{ borderColor: '#1e3a8a', color: '#666' }}
            >
              Foto 3x4
            </div>
          )}
        </div>
      </div>

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-lg font-bold mb-3 pb-1 border-b-2"
            style={{ color: '#1e3a8a', borderColor: '#1e3a8a' }}
          >
            FORMAÇÃO ACADÊMICA
          </h2>
          <div className="space-y-2 text-sm">
            {data.education.map((edu) => (
              <div key={edu.id}>
                {edu.course && (
                  <p>
                    <strong>{edu.course}</strong>
                    {edu.institution && ` - ${edu.institution}`}
                    {edu.period && ` (${edu.period})`}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-lg font-bold mb-3 pb-1 border-b-2"
            style={{ color: '#1e3a8a', borderColor: '#1e3a8a' }}
          >
            EXPERIÊNCIA PROFISSIONAL
          </h2>
          <div className="space-y-3 text-sm">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                {exp.company && (
                  <>
                    <p>
                      <strong>Empresa:</strong> {exp.company}
                    </p>
                    {exp.position && (
                      <p>
                        <strong>Cargo:</strong> {exp.position}
                      </p>
                    )}
                    {exp.period && (
                      <p>
                        <strong>Período:</strong> {exp.period}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Courses */}
      {data.courses.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-lg font-bold mb-3 pb-1 border-b-2"
            style={{ color: '#1e3a8a', borderColor: '#1e3a8a' }}
          >
            CURSOS
          </h2>
          <div className="space-y-2 text-sm">
            {data.courses.map((course) => (
              <div key={course.id}>
                {course.name && (
                  <p>
                    <strong>{course.name}</strong>
                    {course.institution && ` - ${course.institution}`}
                    {course.year && ` (${course.year})`}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.filter((s) => s.trim()).length > 0 && (
        <div className="mb-6">
          <h2
            className="text-lg font-bold mb-3 pb-1 border-b-2"
            style={{ color: '#1e3a8a', borderColor: '#1e3a8a' }}
          >
            HABILIDADES
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {data.skills
              .filter((s) => s.trim())
              .map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
          </ul>
        </div>
      )}

      {/* Observations */}
      {data.observations && (
        <div className="mb-6">
          <h2
            className="text-lg font-bold mb-3 pb-1 border-b-2"
            style={{ color: '#1e3a8a', borderColor: '#1e3a8a' }}
          >
            OBSERVAÇÕES
          </h2>
          <p className="text-sm whitespace-pre-wrap">{data.observations}</p>
        </div>
      )}
    </div>
  );
};
