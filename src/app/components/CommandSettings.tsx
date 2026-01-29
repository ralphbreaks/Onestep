import { SettingSection } from '@/app/components/SettingSection';
import { Switch } from '@/app/components/ui/switch';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Info, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';

interface CommandSettingsProps {
  settings: any;
  onSettingChange: (key: string, value: any) => void;
}

export function CommandSettings({ settings, onSettingChange }: CommandSettingsProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCommandForm, setNewCommandForm] = useState({
    keyword: '',
    name: '',
    description: '',
  });

  const handleToggleCommand = (key: string) => {
    const updated = { ...settings.commands };
    updated[key].enabled = !updated[key].enabled;
    onSettingChange('commands', updated);
  };

  const handleDeleteCommand = (key: string) => {
    if (confirm(`确定要删除命令 ${settings.commands[key].name} 吗？`)) {
      const updated = { ...settings.commands };
      delete updated[key];
      onSettingChange('commands', updated);
    }
  };

  const handleAddNewCommand = () => {
    if (!newCommandForm.keyword || !newCommandForm.name) {
      alert('请填写命令关键词和名称');
      return;
    }

    const commandKey = newCommandForm.keyword.toLowerCase();
    if (settings.commands[commandKey]) {
      alert('该命令关键词已存在');
      return;
    }

    const updated = { ...settings.commands };
    updated[commandKey] = {
      name: newCommandForm.name,
      description: newCommandForm.description || '自定义命令',
      enabled: true,
      isCustom: true,
    };

    onSettingChange('commands', updated);
    setIsAddingNew(false);
    setNewCommandForm({
      keyword: '',
      name: '',
      description: '',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">搜索框命令设置</h2>
          <Button onClick={() => setIsAddingNew(true)}>
            <Plus className="h-4 w-4 mr-2" />
            添加自定义命令
          </Button>
        </div>
        
        <SettingSection 
          title="系统命令" 
          description="在搜索框中输入命令关键词即可快速执行系统操作"
        >
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              这些命令可以直接在搜索框中输入使用，默认启用，可根据需要禁用
            </AlertDescription>
          </Alert>

          <div className="space-y-3 mt-4">
            {Object.entries(settings.commands).map(([key, command]: [string, any]) => (
              <div 
                key={key}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <code className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm font-semibold">
                      {key}
                    </code>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {command.name}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {command.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  {command.isCustom && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCommand(key)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <Switch
                    checked={command.enabled}
                    onCheckedChange={() => handleToggleCommand(key)}
                  />
                </div>
              </div>
            ))}
          </div>
        </SettingSection>
      </div>

      {/* 添加自定义命令对话框 */}
      <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加自定义命令</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-keyword">命令关键词*</Label>
              <Input
                id="new-keyword"
                value={newCommandForm.keyword}
                onChange={(e) => setNewCommandForm({ ...newCommandForm, keyword: e.target.value })}
                placeholder="例如：mycommand"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                在搜索框中输入此关键词触发命令
              </p>
            </div>
            <div>
              <Label htmlFor="new-name">命令名称*</Label>
              <Input
                id="new-name"
                value={newCommandForm.name}
                onChange={(e) => setNewCommandForm({ ...newCommandForm, name: e.target.value })}
                placeholder="例如：我的自定义命令"
              />
            </div>
            <div>
              <Label htmlFor="new-description">命令描述</Label>
              <Input
                id="new-description"
                value={newCommandForm.description}
                onChange={(e) => setNewCommandForm({ ...newCommandForm, description: e.target.value })}
                placeholder="例如：执行特定的系统操作"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingNew(false)}>
              取消
            </Button>
            <Button onClick={handleAddNewCommand}>
              添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
