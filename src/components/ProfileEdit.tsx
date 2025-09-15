import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import { User } from '../types/user';
import { workExperienceOptions, targetSectorOptions, skillsOptions } from '../data/mockData';

/**
 * Props for the ProfileEdit component
 */
interface ProfileEditProps {
  /** User data to edit */
  user: User;
  /** Callback function when profile is saved */
  onSave: (userData: Partial<User>) => void;
  /** Callback function when editing is cancelled */
  onCancel: () => void;
}

/**
 * Profile editing component that allows users to update their professional information
 * 
 * @param {ProfileEditProps} props - Component props
 * @returns {JSX.Element} Rendered profile edit form
 */
export function ProfileEdit({ user, onSave, onCancel }: ProfileEditProps) {
  // Initialize form data with current user values
  const [formData, setFormData] = useState({
    workExperience: user.workExperience || '',
    targetSector: user.targetSector || '',
    targetPosition: user.targetPosition || '',
    mainSkills: user.mainSkills || [],
    areasToImprove: user.areasToImprove || []
  });

  /**
   * Handles toggling skills in the main skills or areas to improve lists
   * 
   * @param {string} skill - The skill to toggle
   * @param {'mainSkills' | 'areasToImprove'} field - Which field to update
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
   * Handles form submission and saves the updated profile data
   * 
   * @param {React.FormEvent} e - Form submit event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Editar Perfil</h1>
        </div>

        {/* Current Configuration Display */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Configuración Actual</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Experiencia laboral</p>
              <p className="font-medium">{user.workExperience || 'No especificada'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sector objetivo</p>
              <p className="font-medium">{user.targetSector || 'No especificado'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Puesto objetivo</p>
              <p className="font-medium">{user.targetPosition || 'No especificado'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nivel actual</p>
              <p className="font-medium">Nivel {user.level} - {user.totalXP} XP</p>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Actualizar Información</CardTitle>
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
                <Label>Habilidades principales</Label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded">
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
                <p className="text-xs text-muted-foreground">
                  Seleccionadas: {formData.mainSkills.length}
                </p>
              </div>

              <div className="space-y-3">
                <Label>Áreas que deseas fortalecer</Label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded">
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
                <p className="text-xs text-muted-foreground">
                  Seleccionadas: {formData.areasToImprove.length}
                </p>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" className="flex-1">
                  Guardar cambios
                </Button>
                <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}