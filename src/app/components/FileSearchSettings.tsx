import { SettingSection } from '@/app/components/SettingSection';
import { SettingItem } from '@/app/components/SettingItem';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { AlertCircle, FolderPlus, X, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Progress } from '@/app/components/ui/progress';

interface FileSearchSettingsProps {
  settings: any;
  onSettingChange: (key: string, value: any) => void;
}

export function FileSearchSettings({ settings, onSettingChange }: FileSearchSettingsProps) {
  const [newHighPriorityDir, setNewHighPriorityDir] = useState('');
  const [newNormalDir, setNewNormalDir] = useState('');
  const [newBlockedDir, setNewBlockedDir] = useState('');
  const [isIndexing, setIsIndexing] = useState(false);
  const [indexProgress, setIndexProgress] = useState(0);

  const handleAddDirectory = (type: 'highPriority' | 'normal' | 'blocked', path: string) => {
    if (path.trim()) {
      const key = type === 'highPriority' ? 'highPriorityDirs' : type === 'normal' ? 'normalDirs' : 'blockedDirs';
      onSettingChange(key, [...settings[key], path.trim()]);
      
      if (type === 'highPriority') setNewHighPriorityDir('');
      else if (type === 'normal') setNewNormalDir('');
      else setNewBlockedDir('');
    }
  };

  const handleRemoveDirectory = (type: 'highPriority' | 'normal' | 'blocked', index: number) => {
    const key = type === 'highPriority' ? 'highPriorityDirs' : type === 'normal' ? 'normalDirs' : 'blockedDirs';
    const updated = settings[key].filter((_: any, i: number) => i !== index);
    onSettingChange(key, updated);
  };

  const handleRebuildIndex = () => {
    setIsIndexing(true);
    setIndexProgress(0);
    
    const interval = setInterval(() => {
      setIndexProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsIndexing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const renderDirectoryList = (
    title: string,
    description: string,
    type: 'highPriority' | 'normal' | 'blocked',
    items: string[],
    newValue: string,
    setNewValue: (value: string) => void
  ) => (
    <SettingSection title={title} description={description}>
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="输入目录路径"
            onKeyDown={(e) => e.key === 'Enter' && handleAddDirectory(type, newValue)}
          />
          <Button onClick={() => handleAddDirectory(type, newValue)}>
            <FolderPlus className="h-4 w-4 mr-2" />
            添加
          </Button>
        </div>
        
        {items.length > 0 ? (
          <div className="space-y-2">
            {items.map((dir: string, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <span className="text-sm text-gray-700 dark:text-gray-200 truncate flex-1">{dir}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveDirectory(type, index)}
                  className="h-8 w-8 p-0 flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">暂未添加目录</p>
        )}
      </div>
    </SettingSection>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">文件搜索设置</h2>
        
        <SettingSection 
          title="文件索引状态" 
          description="按盘符显示索引统计信息"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">C盘索引</div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">15,847</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">个文件</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">2026-01-27 14:23</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">D盘索引</div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">23,192</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">个文件</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">2026-01-27 14:23</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">E盘索引</div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">8,431</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">个文件</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">2026-01-27 14:23</div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">总计</span>
                <span className="text-base font-semibold text-gray-900 dark:text-gray-100">47,470 个文件</span>
              </div>
            </div>

            {isIndexing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>正在重建索引...</span>
                  <span>{indexProgress}%</span>
                </div>
                <Progress value={indexProgress} className="h-2" />
              </div>
            )}

            <Button 
              variant="outline" 
              onClick={handleRebuildIndex}
              disabled={isIndexing}
              className="w-full"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isIndexing ? 'animate-spin' : ''}`} />
              重建索引
            </Button>

            <SettingItem 
              label="自动更新索引"
              description="文件变动时自动更新索引"
            >
              <select
                value={settings.autoUpdateIndex}
                onChange={(e) => onSettingChange('autoUpdateIndex', e.target.value)}
                className="w-40 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="realtime">实时</option>
                <option value="interval">定时（每小时）</option>
                <option value="manual">手动</option>
              </select>
            </SettingItem>
          </div>
        </SettingSection>

        {renderDirectoryList(
          '高优目录',
          '这些目录的搜索结果将优先显示（如开始菜单、用户下载目录）',
          'highPriority',
          settings.highPriorityDirs,
          newHighPriorityDir,
          setNewHighPriorityDir
        )}

        {renderDirectoryList(
          '正常目录',
          '这些目录将被正常索引和搜索',
          'normal',
          settings.normalDirs,
          newNormalDir,
          setNewNormalDir
        )}

        {renderDirectoryList(
          '屏蔽目录',
          '这些目录将不会被索引和搜索（如system系统文件目录）',
          'blocked',
          settings.blockedDirs,
          newBlockedDir,
          setNewBlockedDir
        )}
      </div>
    </div>
  );
}