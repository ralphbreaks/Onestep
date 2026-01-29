import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { X } from 'lucide-react';

interface KeyboardShortcutProps {
  label: string;
  defaultShortcut: string;
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
}

export function KeyboardShortcut({ 
  label, 
  defaultShortcut, 
  value, 
  onChange,
  onReset 
}: KeyboardShortcutProps) {
  const [isRecording, setIsRecording] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isRecording) return;
    
    e.preventDefault();
    const keys: string[] = [];
    
    if (e.ctrlKey) keys.push('Ctrl');
    if (e.altKey) keys.push('Alt');
    if (e.shiftKey) keys.push('Shift');
    if (e.metaKey) keys.push('Cmd');
    
    if (!['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) {
      keys.push(e.key.toUpperCase());
    }
    
    if (keys.length > 1) {
      onChange(keys.join('+'));
      setIsRecording(false);
    }
  };

  return (
    <div className="flex items-center gap-2 py-2">
      <div className="flex-1 min-w-0">
        <span className="text-sm text-gray-700 dark:text-gray-200">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <Input
          value={isRecording ? '按下组合键...' : value}
          onFocus={() => setIsRecording(true)}
          onBlur={() => setIsRecording(false)}
          onKeyDown={handleKeyDown}
          readOnly
          className="w-40 text-sm cursor-pointer"
          placeholder="点击录制"
        />
        {value !== defaultShortcut && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}