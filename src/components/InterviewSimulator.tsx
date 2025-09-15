import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { mockQuestions } from '../data/mockData';
import { Question } from '../types/user';
import { Mic, MicOff, Play, Pause, SkipForward, Save } from 'lucide-react';

/**
 * Props for the InterviewSimulator component
 */
interface InterviewSimulatorProps {
  /** Optional category to filter questions */
  category?: 'soft-skills' | 'technical' | 'general';
  /** Callback function when interview is completed */
  onComplete: (score: number, answers: { questionId: string, answer: string }[]) => void;
  /** Callback function when interview is cancelled */
  onCancel: () => void;
}

/**
 * Interview simulator component that presents questions and collects answers
 * Simulates a real interview experience with progress tracking and audio recording options
 * 
 * @param {InterviewSimulatorProps} props - Component props
 * @returns {JSX.Element} Rendered interview simulator
 */
export function InterviewSimulator({ category, onComplete, onCancel }: InterviewSimulatorProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string, answer: string }[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Filter questions by category if specified, otherwise use sample questions
  const questions = category 
    ? mockQuestions.filter(q => q.category === category)
    : mockQuestions.slice(0, 3); // Use fewer sample questions

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  /**
   * Handles moving to next question or completing the interview
   * Saves current answer and progresses through questions
   */
  const handleNextQuestion = () => {
    if (currentAnswer.trim()) {
      setAnswers(prev => [...prev, { 
        questionId: currentQuestion.id, 
        answer: currentAnswer 
      }]);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswer('');
    } else {
      // Interview complete - generate mock score for demonstration
      const mockScore = Math.floor(Math.random() * 30) + 70; // Random score between 70-100
      onComplete(mockScore, answers);
    }
  };

  /**
   * Handles skipping current question without saving answer
   */
  const handleSkipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswer('');
    }
  };

  /**
   * Toggles audio recording state
   * In a real implementation, this would start/stop actual audio recording
   */
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, you would start/stop audio recording here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Simulador de Entrevista</CardTitle>
              <Button variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
                <span>Tiempo: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{currentQuestion.text}</CardTitle>
              <div className="flex space-x-2">
                <Badge variant="outline">{currentQuestion.category}</Badge>
                <Badge variant={currentQuestion.difficulty === 'easy' ? 'default' : 
                               currentQuestion.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                  {currentQuestion.difficulty}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Escribe tu respuesta aquí..."
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="min-h-[120px]"
            />
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  onClick={toggleRecording}
                  size="sm"
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  {isRecording ? "Detener" : "Grabar"}
                </Button>
                
                <Button variant="outline" size="sm" onClick={() => setCurrentAnswer('')}>
                  Limpiar
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  onClick={handleSkipQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  <SkipForward className="h-4 w-4 mr-2" />
                  Saltar
                </Button>
                
                <Button 
                  onClick={handleNextQuestion}
                  disabled={!currentAnswer.trim()}
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Progreso de la Entrevista</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{answers.length}</p>
                <p className="text-sm text-muted-foreground">Respondidas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{questions.length - answers.length}</p>
                <p className="text-sm text-muted-foreground">Restantes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{Math.floor(progress)}%</p>
                <p className="text-sm text-muted-foreground">Completado</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{timeElapsed}s</p>
                <p className="text-sm text-muted-foreground">Tiempo total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}