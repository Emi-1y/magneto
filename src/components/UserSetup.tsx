import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { User } from '../types/user';
import { workExperienceOptions, targetSectorOptions, skillsOptions } from '../data/mockData';

/**
 * Props for the UserSetup component
 */
interface UserSetupProps {
  /** Current user object */
  user: User;
  /** Callback function called when setup is completed */
  onComplete: (userData: Partial<User>) => void;
}

/**
 * User profile setup component for new users
 * Collects work experience, target sector, skills, and improvement areas
 * 
 * @param {UserSetupProps} props - Component props
 * @returns {JSX.Element} Rendered user setup form
 */
export function UserSetup({ user, onComplete }: UserSetupProps) {
  // Form state initialization with user data or empty defaults
  const [formData, setFormData] = useState({
    workExperience: user.workExperience || '',
    targetSector: user.targetSector || '',
    targetPosition: user.targetPosition || '',
    mainSkills: user.mainSkills || [],
    areasToImprove: user.areasToImprove || []
  });

  /**
   * Handles toggling skills in main skills or areas to improve
   * 
   * @param {string} skill - The skill being toggled
   * @param {'mainSkills' | 'areasToImprove'} field - Which array to update
   */
  const handleSkillToggle = (skill: string, field: 'mainSkills' | 'areasToImprove') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(skill)
        ? prev[field].filter(s => s !== skill)
        : [...prev[field], skill]
    }));
  };

  /**
   * Handles form submission
   * 
   * @param {React.FormEvent} e - Form submit event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Configura tu perfil</CardTitle>
          <p className="text-muted-foreground">
            Cuéntanos sobre ti para personalizar tu experiencia de entrenamiento
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="workExperience">Experiencia laboral</Label>
              <Select value={formData.workExperience} onValueChange={(value) => setFormData(prev => ({ ...prev, workExperience: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu experiencia" />
                </SelectTrigger>
                <SelectContent>
                  {workExperienceOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetSector">Sector o industria objetivo</Label>
              <Select value={formData.targetSector} onValueChange={(value) => setFormData(prev => ({ ...prev, targetSector: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el sector" />
                </SelectTrigger>
                <SelectContent>
                  {targetSectorOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetPosition">Puesto o rol al que aspiras</Label>
              <Input
                id="targetPosition"
                value={formData.targetPosition}
                onChange={(e) => setFormData(prev => ({ ...prev, targetPosition: e.target.value }))}
                placeholder="ej. Gerente de Ventas, Analista Financiero, Coordinator de Marketing..."
              />
            </div>

            <div className="space-y-3">
              <Label>Áreas de conocimiento o habilidades principales</Label>
              <div className="grid grid-cols-2 gap-2">
                {skillsOptions.map(skill => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={`main-${skill}`}
                      checked={formData.mainSkills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill, 'mainSkills')}
                    />
                    <Label htmlFor={`main-${skill}`} className="text-sm">{skill}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Principales áreas que deseas fortalecer</Label>
              <div className="grid grid-cols-2 gap-2">
                {skillsOptions.map(skill => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={`improve-${skill}`}
                      checked={formData.areasToImprove.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill, 'areasToImprove')}
                    />
                    <Label htmlFor={`improve-${skill}`} className="text-sm">{skill}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Completar configuración
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}