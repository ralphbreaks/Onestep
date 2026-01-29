import { SettingSection } from '@/app/components/SettingSection';
import { SettingItem } from '@/app/components/SettingItem';
import { Switch } from '@/app/components/ui/switch';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { AlertCircle, X, HardDrive, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/components/ui/alert-dialog';

interface SmartClipboardSettingsProps {
  settings: any;
  onSettingChange: (key: string, value: any) => void;
}

export function SmartClipboardSettings({ settings, onSettingChange }: SmartClipboardSettingsProps) {
  const [newApp, setNewApp] = useState('');
  const [showClearFavoritesDialog, setShowClearFavoritesDialog] = useState(false);
  const [showClearHistoryDialog, setShowClearHistoryDialog] = useState(false);

  const handleAddApp = () => {
    if (newApp.trim()) {
      onSettingChange('appBlacklist', [...settings.appBlacklist, newApp.trim()]);
      setNewApp('');
    }
  };

  const handleRemoveApp = (index: number) => {
    const updated = settings.appBlacklist.filter((_: any, i: number) => i !== index);
    onSettingChange('appBlacklist', updated);
  };

  const handleClearFavorites = () => {
    // 实际清空操作
    setShowClearFavoritesDialog(false);
    console.log('清空所有收藏');
  };

  const handleClearHistory = () => {
    // 实际清空操作
    setShowClearHistoryDialog(false);
    console.log('清空所有历史记录');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">智能剪切板设置</h2>
        
        <SettingSection title="剪切板功能">
          <SettingItem 
            label="启用剪切板" 
            description="启用智能剪切板监听和记录功能"
          >
            <Switch
              checked={settings.clipboardEnabled}
              onCheckedChange={(checked) => onSettingChange('clipboardEnabled', checked)}
            />
          </SettingItem>
        </SettingSection>

        <SettingSection title="剪切板监听设置">
          <SettingItem 
            label="记录图片" 
            description="监听并保存复制的图片内容"
          >
            <Switch
              checked={settings.recordImages}
              onCheckedChange={(checked) => onSettingChange('recordImages', checked)}
              disabled={!settings.clipboardEnabled}
            />
          </SettingItem>

          <SettingItem 
            label="记录文件" 
            description="监听并保存复制的文件路径"
          >
            <Switch
              checked={settings.recordFiles}
              onCheckedChange={(checked) => onSettingChange('recordFiles', checked)}
              disabled={!settings.clipboardEnabled}
            />
          </SettingItem>
        </SettingSection>

        <SettingSection 
          title="应用黑名单" 
          description="以下应用的剪切板内容将不会被记录"
        >
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={newApp}
                onChange={(e) => setNewApp(e.target.value)}
                placeholder="输入应用名称或进程名"
                onKeyDown={(e) => e.key === 'Enter' && handleAddApp()}
                disabled={!settings.clipboardEnabled}
              />
              <Button onClick={handleAddApp} disabled={!settings.clipboardEnabled}>添加</Button>
            </div>
            
            {settings.appBlacklist.length > 0 ? (
              <div className="space-y-2">
                {settings.appBlacklist.map((app: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-200">{app}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveApp(index)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">暂无黑名单应用</p>
            )}
          </div>
        </SettingSection>

        <SettingSection title="剪切板收藏设置">
          <SettingItem 
            label="在剪切板左侧显示收藏夹"
            description="在剪切板界面左侧显示收藏的内容列表"
          >
            <Switch
              checked={settings.showFavoritesOnLeft}
              onCheckedChange={(checked) => onSettingChange('showFavoritesOnLeft', checked)}
              disabled={!settings.clipboardEnabled}
            />
          </SettingItem>

          <div className="pt-2">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                当前收藏数: 42 项 | 数据库大小: 8.5 MB
              </AlertDescription>
            </Alert>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1 min-w-0 mr-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">收藏数据库路径</div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 truncate">
                    C:\Users\YourName\AppData\Local\OneStepApp\favorites.db
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!settings.clipboardEnabled}
                  >
                    <FolderOpen className="h-4 w-4 mr-1" />
                    打开
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!settings.clipboardEnabled}
                  >
                    修改
                  </Button>
                </div>
              </div>
            </div>

            <Button
              variant="destructive"
              className="w-full mt-3"
              disabled={!settings.clipboardEnabled}
              onClick={() => setShowClearFavoritesDialog(true)}
            >
              清空所有收藏
            </Button>

            <AlertDialog open={showClearFavoritesDialog} onOpenChange={setShowClearFavoritesDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>确认清空收藏</AlertDialogTitle>
                  <AlertDialogDescription>
                    确认要清空所有收藏吗？此操作不可恢复。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearFavorites}>确认</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </SettingSection>

        <SettingSection title="剪切板数据管理">
          <SettingItem 
            label="历史记录存储条数"
            description="超过此数量后将自动删除最旧的记录"
          >
            <Input
              type="number"
              min="100"
              step="100"
              value={settings.maxHistory}
              onChange={(e) => onSettingChange('maxHistory', parseInt(e.target.value) || 1000)}
              disabled={!settings.clipboardEnabled}
              className="w-40"
            />
          </SettingItem>

          <Alert>
            <HardDrive className="h-4 w-4" />
            <AlertDescription>
              当前已使用: 245 MB | 历史记录数: 3,847 条
            </AlertDescription>
          </Alert>

          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1 min-w-0 mr-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">剪切历史数据库路径</div>
                <div className="text-sm text-gray-700 dark:text-gray-200 truncate">
                  C:\Users\YourName\AppData\Local\OneStepApp\history.db
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!settings.clipboardEnabled}
                >
                  <FolderOpen className="h-4 w-4 mr-1" />
                  打开
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!settings.clipboardEnabled}
                >
                  修改
                </Button>
              </div>
            </div>
          </div>

          <SettingItem 
            label="启用自动清理"
            description="自动清理过期的剪切板历史记录"
          >
            <Switch
              checked={settings.autoClean}
              onCheckedChange={(checked) => onSettingChange('autoClean', checked)}
              disabled={!settings.clipboardEnabled}
            />
          </SettingItem>

          <SettingItem 
            label="过期时间"
            description="超过此时间的记录将被自动删除"
          >
            <Select
              value={settings.cleanupPeriod}
              onValueChange={(value) => onSettingChange('cleanupPeriod', value)}
              disabled={!settings.clipboardEnabled || !settings.autoClean}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 天</SelectItem>
                <SelectItem value="15">15 天</SelectItem>
                <SelectItem value="30">30 天</SelectItem>
                <SelectItem value="60">60 天</SelectItem>
                <SelectItem value="90">90 天</SelectItem>
              </SelectContent>
            </Select>
          </SettingItem>

          <SettingItem 
            label="加密数据库"
            description="使用密码加密保护剪切板数据"
          >
            <Switch
              checked={settings.encryptDatabase}
              onCheckedChange={(checked) => onSettingChange('encryptDatabase', checked)}
              disabled={!settings.clipboardEnabled}
            />
          </SettingItem>

          {settings.encryptDatabase && settings.clipboardEnabled && (
            <div className="space-y-3 pl-4 border-l-2 border-blue-400">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  启用加密后需要设置密码，忘记密码��无法恢复数据
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-600 dark:text-gray-300">设置加密密码</label>
                <Input
                  type="password"
                  placeholder="输入密码"
                  className="w-full"
                />
                <Input
                  type="password"
                  placeholder="确认密码"
                  className="w-full"
                />
                <Button className="w-full">设置密码</Button>
              </div>
            </div>
          )}
        </SettingSection>

        <SettingSection title="危险操作">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              以下操作不可恢复，请谨慎操作
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Button
              variant="destructive"
              className="w-full"
              disabled={!settings.clipboardEnabled}
              onClick={() => setShowClearHistoryDialog(true)}
            >
              清空所有历史记录
            </Button>

            <AlertDialog open={showClearHistoryDialog} onOpenChange={setShowClearHistoryDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>确认清空历史记录</AlertDialogTitle>
                  <AlertDialogDescription>
                    确认要清空所有历史记录吗？此操作不可恢复。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearHistory}>确认</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </SettingSection>
      </div>
    </div>
  );
}