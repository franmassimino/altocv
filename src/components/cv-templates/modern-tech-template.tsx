/**
 * Modern Tech CV Template Component
 * A clean, single-column professional CV template with customizable design settings
 */

'use client';

import { CVContent, DesignSettings } from '@/types/cv-content';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import EditableTextField from '@/components/cv-editor/editable-text-field';
import EditableBulletList from '@/components/cv-editor/editable-bullet-list';
import EditableDatePicker from '@/components/cv-editor/editable-date-picker';
import { useCVEditorStore } from '@/lib/stores/cv-editor.store';

/**
 * Props for Modern Tech Template component
 */
interface ModernTechTemplateProps {
  cv: CVContent;
  designSettings?: DesignSettings;
  editable?: boolean;
}

/**
 * Helper function to format date strings
 */
function formatDate(dateString: string): string {
  return format(new Date(dateString), 'MMM yyyy');
}

/**
 * Modern Tech Template Component
 * Renders a professional CV with customizable design via CSS custom properties
 */
export default function ModernTechTemplate({
  cv,
  designSettings,
  editable = false,
}: ModernTechTemplateProps) {
  // Zustand store actions (only used when editable)
  const updatePersonalInfo = useCVEditorStore((state) => state.updatePersonalInfo);
  const updateSummary = useCVEditorStore((state) => state.updateSummary);
  const updateExperience = useCVEditorStore((state) => state.updateExperience);
  const updateEducation = useCVEditorStore((state) => state.updateEducation);
  const updateProject = useCVEditorStore((state) => state.updateProject);
  const updateSkill = useCVEditorStore((state) => state.updateSkill);
  const addSkill = useCVEditorStore((state) => state.addSkill);
  const deleteSkill = useCVEditorStore((state) => state.deleteSkill);
  return (
    <div
      className="cv-template modern-tech"
      style={
        {
          '--cv-color-primary': designSettings?.colors.primary ?? '#2563eb',
          '--cv-color-accent': designSettings?.colors.accent ?? '#0ea5e9',
          '--cv-color-text': designSettings?.colors.text ?? '#1f2937',
          '--cv-color-background':
            designSettings?.colors.background ?? '#ffffff',
          '--cv-font-heading': designSettings?.typography.fontPairing ?? 'Inter',
          '--cv-font-body': designSettings?.typography.fontPairing ?? 'Inter',
          '--cv-heading-size': `${designSettings?.typography.headingSize ?? 24}px`,
          '--cv-body-size': `${designSettings?.typography.bodySize ?? 14}px`,
          '--cv-line-height': designSettings?.typography.lineHeight ?? 1.6,
          '--cv-spacing-section': `${designSettings?.spacing.sectionMargin ?? 24}px`,
          '--cv-spacing-content': `${designSettings?.spacing.contentPadding ?? 16}px`,
        } as React.CSSProperties
      }
    >
      <div className="bg-[var(--cv-color-background)] text-[var(--cv-color-text)] font-[var(--cv-font-body)] text-[length:var(--cv-body-size)] leading-[var(--cv-line-height)] px-4 md:px-8 py-6 md:py-10 max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-[var(--cv-spacing-section)]">
          <h1 className="text-3xl md:text-4xl font-bold font-[var(--cv-font-heading)] text-[var(--cv-color-text)] mb-4">
            {editable ? (
              <EditableTextField
                value={cv.personalInfo.name}
                onSave={(value) => updatePersonalInfo({ name: value })}
                label="name"
                className="text-center"
              />
            ) : (
              cv.personalInfo.name
            )}
          </h1>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 text-sm text-[var(--cv-color-text)]/80">
            {/* Email - Always shown */}
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[var(--cv-color-primary)]" />
              {editable ? (
                <EditableTextField
                  value={cv.personalInfo.email}
                  onSave={(value) => updatePersonalInfo({ email: value })}
                  label="email"
                  validation="email"
                  required={true}
                  className="text-sm"
                />
              ) : (
                <a
                  href={`mailto:${cv.personalInfo.email}`}
                  className="hover:text-[var(--cv-color-primary)] transition-colors"
                >
                  {cv.personalInfo.email}
                </a>
              )}
            </div>

            {/* Phone - Optional */}
            {(cv.personalInfo.phone || editable) && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[var(--cv-color-primary)]" />
                {editable ? (
                  <EditableTextField
                    value={cv.personalInfo.phone || ''}
                    onSave={(value) => updatePersonalInfo({ phone: value })}
                    label="phone"
                    placeholder="Add phone"
                    className="text-sm"
                  />
                ) : (
                  <a
                    href={`tel:${cv.personalInfo.phone}`}
                    className="hover:text-[var(--cv-color-primary)] transition-colors"
                  >
                    {cv.personalInfo.phone}
                  </a>
                )}
              </div>
            )}

            {/* Location - Optional */}
            {(cv.personalInfo.location || editable) && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[var(--cv-color-primary)]" />
                {editable ? (
                  <EditableTextField
                    value={cv.personalInfo.location || ''}
                    onSave={(value) => updatePersonalInfo({ location: value })}
                    label="location"
                    placeholder="Add location"
                    className="text-sm"
                  />
                ) : (
                  <span>{cv.personalInfo.location}</span>
                )}
              </div>
            )}

            {/* LinkedIn - Optional */}
            {(cv.personalInfo.linkedin || editable) && (
              <div className="flex items-center gap-1.5">
                <Linkedin className="w-4 h-4 text-[var(--cv-color-primary)]" />
                {editable ? (
                  <EditableTextField
                    value={cv.personalInfo.linkedin || ''}
                    onSave={(value) => updatePersonalInfo({ linkedin: value })}
                    label="LinkedIn URL"
                    validation="url"
                    placeholder="Add LinkedIn"
                    className="text-sm"
                  />
                ) : (
                  <a
                    href={cv.personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--cv-color-primary)] transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}

            {/* Website - Optional */}
            {(cv.personalInfo.website || editable) && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[var(--cv-color-primary)]" />
                {editable ? (
                  <EditableTextField
                    value={cv.personalInfo.website || ''}
                    onSave={(value) => updatePersonalInfo({ website: value })}
                    label="website URL"
                    validation="url"
                    placeholder="Add website"
                    className="text-sm"
                  />
                ) : (
                  <a
                    href={cv.personalInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--cv-color-primary)] transition-colors"
                  >
                    Website
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Summary Section - Optional */}
        {(cv.summary || editable) && (
          <section className="mb-[var(--cv-spacing-section)]">
            <h2 className="text-xl md:text-2xl font-semibold font-[var(--cv-font-heading)] text-[var(--cv-color-primary)] mb-3">
              Professional Summary
            </h2>
            <Separator className="mb-3" />
            {editable ? (
              <EditableTextField
                value={cv.summary || ''}
                onSave={(value) => updateSummary(value)}
                multiline={true}
                label="summary"
                placeholder="Add professional summary"
                className="text-[var(--cv-color-text)]/90 leading-relaxed"
              />
            ) : (
              <p className="text-[var(--cv-color-text)]/90 leading-relaxed">
                {cv.summary}
              </p>
            )}
          </section>
        )}

        {/* Experience Section */}
        {cv.experience.length > 0 && (
          <section className="mb-[var(--cv-spacing-section)]">
            <h2 className="text-xl md:text-2xl font-semibold font-[var(--cv-font-heading)] text-[var(--cv-color-primary)] mb-3">
              Work Experience
            </h2>
            <Separator className="mb-4" />
            <div className="space-y-5">
              {cv.experience.map((exp, index) => (
                <div key={exp.id} className="cv-section">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[var(--cv-color-text)]">
                        {editable ? (
                          <EditableTextField
                            value={exp.company}
                            onSave={(value) => updateExperience(index, { company: value })}
                            label="company"
                          />
                        ) : (
                          exp.company
                        )}
                      </h3>
                      <p className="text-base font-medium text-[var(--cv-color-text)]/80 italic">
                        {editable ? (
                          <EditableTextField
                            value={exp.role}
                            onSave={(value) => updateExperience(index, { role: value })}
                            label="role"
                          />
                        ) : (
                          exp.role
                        )}
                      </p>
                    </div>
                    <div className="text-sm text-[var(--cv-color-text)]/70 md:text-right">
                      {editable ? (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <EditableDatePicker
                              value={exp.startDate}
                              onSave={(value) => updateExperience(index, { startDate: value || '' })}
                              label="start date"
                            />
                            <span>-</span>
                            <EditableDatePicker
                              value={exp.current ? 'current' : exp.endDate || null}
                              onSave={(value) => {
                                if (value === 'current') {
                                  updateExperience(index, { current: true, endDate: undefined });
                                } else {
                                  updateExperience(index, { current: false, endDate: value || '' });
                                }
                              }}
                              allowCurrent={true}
                              label="end date"
                            />
                          </div>
                          <EditableTextField
                            value={exp.location || ''}
                            onSave={(value) => updateExperience(index, { location: value })}
                            label="location"
                            placeholder="Add location"
                            className="text-sm"
                          />
                        </div>
                      ) : (
                        <>
                          <p>
                            {formatDate(exp.startDate)} -{' '}
                            {exp.current ? 'Present' : formatDate(exp.endDate!)}
                          </p>
                          {exp.location && <p>{exp.location}</p>}
                        </>
                      )}
                    </div>
                  </div>
                  {editable ? (
                    <EditableBulletList
                      items={exp.bullets}
                      onUpdate={(bullets) => updateExperience(index, { bullets })}
                    />
                  ) : (
                    exp.bullets.length > 0 && (
                      <ul className="list-disc list-outside ml-5 space-y-1.5 text-[var(--cv-color-text)]/90">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {cv.education.length > 0 && (
          <section className="mb-[var(--cv-spacing-section)]">
            <h2 className="text-xl md:text-2xl font-semibold font-[var(--cv-font-heading)] text-[var(--cv-color-primary)] mb-3">
              Education
            </h2>
            <Separator className="mb-4" />
            <div className="space-y-5">
              {cv.education.map((edu, index) => (
                <div key={edu.id} className="cv-section">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[var(--cv-color-text)]">
                        {editable ? (
                          <EditableTextField
                            value={edu.institution}
                            onSave={(value) => updateEducation(index, { institution: value })}
                            label="institution"
                          />
                        ) : (
                          edu.institution
                        )}
                      </h3>
                      <p className="text-base font-medium text-[var(--cv-color-text)]/80">
                        {editable ? (
                          <span className="flex gap-2">
                            <EditableTextField
                              value={edu.degree}
                              onSave={(value) => updateEducation(index, { degree: value })}
                              label="degree"
                              className="flex-1"
                            />
                            <span>in</span>
                            <EditableTextField
                              value={edu.field}
                              onSave={(value) => updateEducation(index, { field: value })}
                              label="field of study"
                              className="flex-1"
                            />
                          </span>
                        ) : (
                          `${edu.degree} in ${edu.field}`
                        )}
                      </p>
                      {(edu.gpa || editable) && (
                        <p className="text-sm text-[var(--cv-color-text)]/70">
                          GPA:{' '}
                          {editable ? (
                            <EditableTextField
                              value={edu.gpa || ''}
                              onSave={(value) => updateEducation(index, { gpa: value })}
                              label="GPA"
                              placeholder="Add GPA"
                              className="inline-block"
                            />
                          ) : (
                            edu.gpa
                          )}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-[var(--cv-color-text)]/70 md:text-right">
                      {editable ? (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <EditableDatePicker
                              value={edu.startDate}
                              onSave={(value) => updateEducation(index, { startDate: value || '' })}
                              label="start date"
                            />
                            <span>-</span>
                            <EditableDatePicker
                              value={edu.endDate || null}
                              onSave={(value) => updateEducation(index, { endDate: value || undefined })}
                              label="end date"
                            />
                          </div>
                          <EditableTextField
                            value={edu.location || ''}
                            onSave={(value) => updateEducation(index, { location: value })}
                            label="location"
                            placeholder="Add location"
                            className="text-sm"
                          />
                        </div>
                      ) : (
                        <>
                          <p>
                            {formatDate(edu.startDate)} -{' '}
                            {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                          </p>
                          {edu.location && <p>{edu.location}</p>}
                        </>
                      )}
                    </div>
                  </div>
                  {editable ? (
                    <EditableBulletList
                      items={edu.achievements}
                      onUpdate={(achievements) => updateEducation(index, { achievements })}
                    />
                  ) : (
                    edu.achievements.length > 0 && (
                      <ul className="list-disc list-outside ml-5 space-y-1.5 text-[var(--cv-color-text)]/90">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {cv.skills.length > 0 && (
          <section className="mb-[var(--cv-spacing-section)]">
            <h2 className="text-xl md:text-2xl font-semibold font-[var(--cv-font-heading)] text-[var(--cv-color-primary)] mb-3">
              Skills
            </h2>
            <Separator className="mb-4" />
            <TooltipProvider>
              <div className="flex flex-wrap gap-2">
                {cv.skills.map((skill, idx) => (
                  editable ? (
                    <div key={idx} className="group relative">
                      <Badge
                        variant="secondary"
                        className="px-3 py-1.5 bg-[var(--cv-color-primary)]/10 text-[var(--cv-color-text)] hover:bg-[var(--cv-color-primary)]/20"
                      >
                        <EditableTextField
                          value={skill}
                          onSave={(value) => updateSkill(idx, value)}
                          label={`skill ${idx + 1}`}
                          className="inline-block min-w-[60px]"
                        />
                      </Badge>
                      <button
                        onClick={() => deleteSkill(idx)}
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                        aria-label="Delete skill"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <Tooltip key={idx}>
                      <TooltipTrigger asChild>
                        <div>
                          <Badge
                            variant="secondary"
                            className="px-3 py-1.5 bg-[var(--cv-color-primary)]/10 text-[var(--cv-color-text)] hover:bg-[var(--cv-color-primary)]/20"
                          >
                            {skill}
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{skill}</p>
                      </TooltipContent>
                    </Tooltip>
                  )
                ))}
                {editable && (
                  <button
                    onClick={() => addSkill('New Skill')}
                    className="px-3 py-1.5 rounded border-2 border-dashed border-[var(--cv-color-primary)]/30 text-[var(--cv-color-primary)] hover:border-[var(--cv-color-primary)] hover:bg-[var(--cv-color-primary)]/5 transition-colors text-sm"
                  >
                    + Add Skill
                  </button>
                )}
              </div>
            </TooltipProvider>
          </section>
        )}

        {/* Projects Section */}
        {cv.projects.length > 0 && (
          <section className="mb-[var(--cv-spacing-section)]">
            <h2 className="text-xl md:text-2xl font-semibold font-[var(--cv-font-heading)] text-[var(--cv-color-primary)] mb-3">
              Projects
            </h2>
            <Separator className="mb-4" />
            <div className="space-y-5">
              {cv.projects.map((project, index) => (
                <div key={project.id} className="cv-section">
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold text-[var(--cv-color-text)] inline">
                      {editable ? (
                        <EditableTextField
                          value={project.name}
                          onSave={(value) => updateProject(index, { name: value })}
                          label="project name"
                        />
                      ) : (
                        project.url ? (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[var(--cv-color-primary)] transition-colors"
                          >
                            {project.name}
                          </a>
                        ) : (
                          project.name
                        )
                      )}
                    </h3>
                    {editable ? (
                      <div className="flex items-center gap-2 mt-2">
                        <EditableDatePicker
                          value={project.startDate || null}
                          onSave={(value) => updateProject(index, { startDate: value || undefined })}
                          label="project start date"
                        />
                        <span>-</span>
                        <EditableDatePicker
                          value={project.endDate || null}
                          onSave={(value) => updateProject(index, { endDate: value || undefined })}
                          label="project end date"
                        />
                      </div>
                    ) : (
                      (project.startDate || project.endDate) && (
                        <span className="text-sm text-[var(--cv-color-text)]/70 ml-3">
                          {project.startDate && formatDate(project.startDate)}
                          {project.startDate && project.endDate && ' - '}
                          {project.endDate && formatDate(project.endDate)}
                        </span>
                      )
                    )}
                  </div>
                  <div className="mb-2">
                    {editable ? (
                      <EditableTextField
                        value={project.description}
                        onSave={(value) => updateProject(index, { description: value })}
                        multiline={true}
                        label="project description"
                        className="text-[var(--cv-color-text)]/90"
                      />
                    ) : (
                      <p className="text-[var(--cv-color-text)]/90">
                        {project.description}
                      </p>
                    )}
                  </div>
                  {(editable || project.url) && (
                    <div className="mb-2">
                      {editable ? (
                        <EditableTextField
                          value={project.url || ''}
                          onSave={(value) => updateProject(index, { url: value })}
                          label="project URL"
                          validation="url"
                          placeholder="Add project URL"
                          className="text-sm"
                        />
                      ) : (
                        project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[var(--cv-color-primary)] hover:underline"
                          >
                            {project.url}
                          </a>
                        )
                      )}
                    </div>
                  )}
                  {editable ? (
                    <EditableBulletList
                      items={project.technologies}
                      onUpdate={(technologies) => updateProject(index, { technologies })}
                    />
                  ) : (
                    project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.technologies.map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="px-2 py-0.5 bg-[var(--cv-color-accent)]/10 text-[var(--cv-color-text)]/80 text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )
                  )}
                  {editable ? (
                    <EditableBulletList
                      items={project.highlights}
                      onUpdate={(highlights) => updateProject(index, { highlights })}
                    />
                  ) : (
                    project.highlights.length > 0 && (
                      <ul className="list-disc list-outside ml-5 space-y-1.5 text-[var(--cv-color-text)]/90">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
