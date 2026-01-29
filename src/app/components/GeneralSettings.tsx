import { SettingSection } from '@/app/components/SettingSection';
import { SettingItem } from '@/app/components/SettingItem';
import { Switch } from '@/app/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Button } from '@/app/components/ui/button';

interface GeneralSettingsProps {
  settings: any;
  onSettingChange: (key: string, value: any) => void;
}

export function GeneralSettings({ settings, onSettingChange }: GeneralSettingsProps) {
  const shortcuts = [
    { value: 'doubleCtrl', label: '双击 Ctrl' },
    { value: 'ctrlSpace', label: 'Ctrl+Space' },
    { value: 'altSpace', label: 'Alt+Space' },
  ];

  const currentShortcut = shortcuts.find(s => s.value === settings.searchBoxShortcut);
  const otherShortcuts = shortcuts.filter(s => s.value !== settings.searchBoxShortcut);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">通用设置</h2>
        
        <SettingSection title="搜索框">
          <div className="space-y-4">
            <SettingItem 
              label="搜索框快捷键"
              description="唤起搜索框的全局快捷键"
            >
              <div className="flex flex-col items-end gap-2 min-w-[200px]">
                {/* 当前选中的大按钮 */}
                <div className="w-full px-4 py-2 text-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <span className="text-base font-medium text-gray-700 dark:text-gray-200">
                    {currentShortcut?.label}
                  </span>
                </div>
                
                {/* 其他选项的小按钮 */}
                <div className="flex gap-2 w-full justify-end">
                  {otherShortcuts.map((shortcut) => (
                    <button
                      key={shortcut.value}
                      onClick={() => onSettingChange('searchBoxShortcut', shortcut.value)}
                      className="px-2.5 py-1 text-xs bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {shortcut.label}
                    </button>
                  ))}
                </div>
              </div>
            </SettingItem>

            <SettingItem 
              label="显示最近使用"
              description="在搜索框中显示最近使用的项目"
            >
              <Switch
                checked={settings.showRecent}
                onCheckedChange={(checked) => onSettingChange('showRecent', checked)}
              />
            </SettingItem>

            <SettingItem 
              label="显示已固定"
              description="在搜索框中显示已固定的项目"
            >
              <Switch
                checked={settings.showPinned}
                onCheckedChange={(checked) => onSettingChange('showPinned', checked)}
              />
            </SettingItem>
          </div>
        </SettingSection>

        <SettingSection title="界面">
          <SettingItem 
            label="界面主题"
          >
            <Select
              value={settings.theme}
              onValueChange={(value) => onSettingChange('theme', value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">浅色</SelectItem>
                <SelectItem value="dark">深色</SelectItem>
                <SelectItem value="system">跟随系统</SelectItem>
              </SelectContent>
            </Select>
          </SettingItem>

          <SettingItem 
            label="悬浮球" 
            description="显示桌面悬浮球快捷入口"
          >
            <Switch
              checked={settings.floatingBall}
              onCheckedChange={(checked) => onSettingChange('floatingBall', checked)}
            />
          </SettingItem>
        </SettingSection>

        <SettingSection title="启动">
          <SettingItem 
            label="开机自启" 
            description="系统启动时自动运行应用"
          >
            <Switch
              checked={settings.autoStart}
              onCheckedChange={(checked) => onSettingChange('autoStart', checked)}
            />
          </SettingItem>
        </SettingSection>
      </div>
    </div>
  );
}