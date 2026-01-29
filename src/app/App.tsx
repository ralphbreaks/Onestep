import { useState, useEffect } from 'react';
import { Settings, Keyboard, FileSearch, Clipboard, Terminal, Globe, Info } from 'lucide-react';
import { GeneralSettings } from '@/app/components/GeneralSettings';
import { ShortcutSettings, defaultShortcuts } from '@/app/components/ShortcutSettings';
import { FileSearchSettings } from '@/app/components/FileSearchSettings';
import { SmartClipboardSettings } from '@/app/components/SmartClipboardSettings';
import { CommandSettings } from '@/app/components/CommandSettings';
import { SearchEngineSettings } from '@/app/components/SearchEngineSettings';
import { AboutSettings } from '@/app/components/AboutSettings';

type TabId = 'general' | 'shortcuts' | 'fileSearch' | 'clipboard' | 'searchCommands' | 'webSearch' | 'about';

const tabs = [
  { id: 'general' as TabId, label: '通用设置', icon: Settings },
  { id: 'shortcuts' as TabId, label: '快捷键设置', icon: Keyboard },
  { id: 'fileSearch' as TabId, label: '文件搜索设置', icon: FileSearch },
  { id: 'clipboard' as TabId, label: '智能剪切板设置', icon: Clipboard },
  { id: 'searchCommands' as TabId, label: '搜索框命令设置', icon: Terminal },
  { id: 'webSearch' as TabId, label: '网络搜索设置', icon: Globe },
  { id: 'about' as TabId, label: '关于', icon: Info },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize app
  useEffect(() => {
    try {
      // Simple initialization
      setIsLoading(false);
    } catch (error) {
      console.error('Initialization error:', error);
      setIsLoading(false);
    }
  }, []);
  
  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    searchBoxShortcut: 'ctrlSpace',
    showRecent: true,
    showPinned: true,
    theme: 'light',
    floatingBall: true,
    autoStart: true,
  });

  // Shortcut settings
  const [shortcuts, setShortcuts] = useState({ ...defaultShortcuts });

  // File search settings
  const [fileSearchSettings, setFileSearchSettings] = useState({
    highPriorityDirs: [
      'C:\\Users\\YourName\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu',
      'C:\\Users\\YourName\\Downloads',
    ],
    normalDirs: [
      'C:\\Users\\YourName\\Documents',
      'C:\\Users\\YourName\\Desktop',
      'D:\\Projects',
    ],
    blockedDirs: [
      'C:\\Windows\\System32',
      'C:\\Program Files',
      'C:\\Program Files (x86)',
      'node_modules',
      '$RECYCLE.BIN',
    ],
    autoUpdateIndex: 'realtime',
  });

  // Smart clipboard settings
  const [smartClipboardSettings, setSmartClipboardSettings] = useState({
    clipboardEnabled: true,
    recordImages: true,
    recordFiles: true,
    appBlacklist: ['WeChat.exe', '1Password.exe', 'Bitwarden.exe'],
    showFavoritesOnLeft: true,
    maxHistory: 5000,
    autoClean: true,
    cleanupPeriod: '30',
    encryptDatabase: false,
  });

  // Command settings
  const [commandSettings, setCommandSettings] = useState({
    commands: {
      rebuild: {
        name: '重建索引',
        description: '重建文件搜索索引',
        enabled: true,
      },
      cmd: {
        name: '打开命令行窗口',
        description: '在当前目录打开cmd',
        enabled: true,
      },
      cmda: {
        name: '打开命令行窗口（管理员）',
        description: '以管理员权限打开cmd',
        enabled: true,
      },
      psh: {
        name: '打开PowerShell',
        description: '在当前目录打开PowerShell',
        enabled: true,
      },
      psha: {
        name: '打开PowerShell（管理员）',
        description: '以管理员权限打开PowerShell',
        enabled: true,
      },
      sleep: {
        name: '系统睡眠',
        description: '让计算机进入睡眠状态',
        enabled: true,
      },
      uninstall: {
        name: '卸载程序',
        description: '打开程序卸载面板',
        enabled: true,
      },
      reboot: {
        name: '重启计算机',
        description: '重启系统',
        enabled: true,
      },
      shutdown: {
        name: '关机',
        description: '关闭计算机',
        enabled: true,
      },
      hosts: {
        name: '编辑hosts',
        description: '打开hosts文件编辑器',
        enabled: true,
      },
    },
  });

  // Search engine settings
  const [searchEngineSettings, setSearchEngineSettings] = useState({
    defaultSearchEngine: 'baidu',
    searchEngines: {
      baidu: {
        name: '百度',
        url: 'https://www.baidu.com/s?wd=',
        icon: '🔍',
        keywords: ['bd', 'baidu', '百度'],
        enabled: true,
        isDefault: true,
      },
      google: {
        name: 'Google',
        url: 'https://www.google.com/search?q=',
        icon: '🌐',
        keywords: ['gg', 'google'],
        enabled: true,
        isDefault: true,
      },
      sogou: {
        name: '搜狗',
        url: 'https://www.sogou.com/web?query=',
        icon: '🔎',
        keywords: ['sg', 'sogou', '搜狗'],
        enabled: true,
        isDefault: true,
      },
      so360: {
        name: '360搜索',
        url: 'https://www.so.com/s?q=',
        icon: '🔍',
        keywords: ['360', 'so'],
        enabled: true,
        isDefault: true,
      },
      douyin: {
        name: '抖音',
        url: 'https://www.douyin.com/search/',
        icon: '🎵',
        keywords: ['dy', 'douyin', '抖音'],
        enabled: true,
        isDefault: true,
      },
      bilibili: {
        name: 'B站',
        url: 'https://search.bilibili.com/all?keyword=',
        icon: '📺',
        keywords: ['bl', 'bilibili', 'b站'],
        enabled: true,
        isDefault: true,
      },
      xiaohongshu: {
        name: '小红书',
        url: 'https://www.xiaohongshu.com/search_result?keyword=',
        icon: '📕',
        keywords: ['xhs', '小红书'],
        enabled: true,
        isDefault: true,
      },
      zhihu: {
        name: '知乎',
        url: 'https://www.zhihu.com/search?q=',
        icon: '💡',
        keywords: ['zh', 'zhihu', '知乎'],
        enabled: true,
        isDefault: true,
      },
    },
  });

  // Apply theme
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [theme]);

  // Handle general setting changes
  const handleGeneralSettingChange = (key: string, value: any) => {
    setGeneralSettings(prev => ({ ...prev, [key]: value }));
    if (key === 'theme') {
      if (value === 'light' || value === 'dark') {
        setTheme(value);
      } else if (value === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
      }
    }
  };

  const handleShortcutChange = (key: string, value: string) => {
    setShortcuts(prev => ({ ...prev, [key]: value }));
  };

  const handleResetAllShortcuts = () => {
    setShortcuts({ ...defaultShortcuts });
  };

  const handleFileSearchSettingChange = (key: string, value: any) => {
    setFileSearchSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSmartClipboardSettingChange = (key: string, value: any) => {
    setSmartClipboardSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleCommandSettingChange = (key: string, value: any) => {
    setCommandSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSearchEngineSettingChange = (key: string, value: any) => {
    setSearchEngineSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">应用设置</h1>
          </div>
          
          <nav className="flex-1 px-3 py-4">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'general'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>通用</span>
              </button>

              <button
                onClick={() => setActiveTab('shortcuts')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'shortcuts'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Keyboard className="h-5 w-5" />
                <span>快捷键</span>
              </button>

              <button
                onClick={() => setActiveTab('fileSearch')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'fileSearch'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <FileSearch className="h-5 w-5" />
                <span>文件搜索</span>
              </button>

              <button
                onClick={() => setActiveTab('clipboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'clipboard'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Clipboard className="h-5 w-5" />
                <span>智能剪切板</span>
              </button>

              <button
                onClick={() => setActiveTab('searchCommands')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'searchCommands'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Terminal className="h-5 w-5" />
                <span>搜索框命令</span>
              </button>

              <button
                onClick={() => setActiveTab('webSearch')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'webSearch'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Globe className="h-5 w-5" />
                <span>网络搜索</span>
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'about'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Info className="h-5 w-5" />
                <span>关于</span>
              </button>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-400 dark:text-gray-500">
              <p>版本 v1.2.3</p>
              <p className="mt-1">© 2026 OneStepApp</p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            {activeTab === 'general' && (
              <GeneralSettings
                settings={generalSettings}
                onSettingChange={handleGeneralSettingChange}
              />
            )}
            
            {activeTab === 'shortcuts' && (
              <ShortcutSettings
                shortcuts={shortcuts}
                onShortcutChange={handleShortcutChange}
                onResetAll={handleResetAllShortcuts}
              />
            )}
            
            {activeTab === 'fileSearch' && (
              <FileSearchSettings
                settings={fileSearchSettings}
                onSettingChange={handleFileSearchSettingChange}
              />
            )}
            
            {activeTab === 'clipboard' && (
              <SmartClipboardSettings
                settings={smartClipboardSettings}
                onSettingChange={handleSmartClipboardSettingChange}
              />
            )}
            
            {activeTab === 'searchCommands' && (
              <CommandSettings
                settings={commandSettings}
                onSettingChange={handleCommandSettingChange}
              />
            )}
            
            {activeTab === 'webSearch' && (
              <SearchEngineSettings
                settings={searchEngineSettings}
                onSettingChange={handleSearchEngineSettingChange}
              />
            )}
            
            {activeTab === 'about' && (
              <AboutSettings />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}