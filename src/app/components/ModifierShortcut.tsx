import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Button } from '@/app/components/ui/button';
import { X } from 'lucide-react';

interface ModifierShortcutProps {
  label: string;
  defaultModifier: string;
  value: string;
  onChange: (modifier: string) => void;
  onReset: () => void;
}

export function ModifierShortcut({ 
  label, 
  defaultModifier, 
  value, 
  onChange,
  onReset 
}: ModifierShortcutProps) {
  return (
    <div className="flex items-center gap-2 py-2">
      <div className="flex-1 min-w-0">
        <span className="text-sm text-gray-700 dark:text-gray-200">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <Select
          value={value}
          onValueChange={onChange}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ctrl">Ctrl</SelectItem>
            <SelectItem value="Alt">Alt</SelectItem>
            <SelectItem value="Shift">Shift</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-500 dark:text-gray-400">+ 序号</span>
        {value !== defaultModifier && (
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