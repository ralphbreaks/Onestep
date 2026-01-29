import { SettingSection } from '@/app/components/SettingSection';
import { KeyboardShortcut } from '@/app/components/KeyboardShortcut';
import { ModifierShortcut } from '@/app/components/ModifierShortcut';
import { Button } from '@/app/components/ui/button';

interface ShortcutSettingsProps {
  shortcuts: any;
  onShortcutChange: (key: string, value: string) => void;
  onResetAll: () => void;
}

const defaultShortcuts = {
  // 搜索框快捷键
  recentQuickOpen: 'Alt+{序号}',
  recentQuickOpenModifier: 'Alt',
  pinnedQuickOpen: 'Ctrl+{序号}',
  pinnedQuickOpenModifier: 'Ctrl',
  expandFullWindow: '双击Ctrl',
  
  // 剪切板快捷键
  toggleClipboard: 'Ctrl+`',
  clipboardQuickPaste: 'Ctrl+{序号}',
  clipboardQuickPasteModifier: 'Ctrl',
  favoriteQuickPaste: 'Alt+{序号}',
  favoriteQuickPasteModifier: 'Alt',
  paste: 'Enter',
  pasteAsText: 'Shift+Enter',
  favorite: 'Ctrl+F',
  copy: 'Ctrl+C',
  copyAsText: '',
};

export function ShortcutSettings({ shortcuts, onShortcutChange, onResetAll }: ShortcutSettingsProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">快捷键设置</h2>
        <Button variant="outline" onClick={onResetAll}>
          重置所有快捷键
        </Button>
      </div>
      
      <SettingSection title="搜索框">
        <ModifierShortcut
          label="最近使用快速打开"
          defaultModifier={defaultShortcuts.recentQuickOpenModifier}
          value={shortcuts.recentQuickOpenModifier}
          onChange={(value) => onShortcutChange('recentQuickOpenModifier', value)}
          onReset={() => onShortcutChange('recentQuickOpenModifier', defaultShortcuts.recentQuickOpenModifier)}
        />
        
        <ModifierShortcut
          label="已固定快速打开"
          defaultModifier={defaultShortcuts.pinnedQuickOpenModifier}
          value={shortcuts.pinnedQuickOpenModifier}
          onChange={(value) => onShortcutChange('pinnedQuickOpenModifier', value)}
          onReset={() => onShortcutChange('pinnedQuickOpenModifier', defaultShortcuts.pinnedQuickOpenModifier)}
        />
        
        <KeyboardShortcut
          label="搜索列表展开完整窗口"
          defaultShortcut={defaultShortcuts.expandFullWindow}
          value={shortcuts.expandFullWindow}
          onChange={(value) => onShortcutChange('expandFullWindow', value)}
          onReset={() => onShortcutChange('expandFullWindow', defaultShortcuts.expandFullWindow)}
        />
      </SettingSection>

      <SettingSection title="剪切板">
        <KeyboardShortcut
          label="激活/隐藏剪切板面板"
          defaultShortcut={defaultShortcuts.toggleClipboard}
          value={shortcuts.toggleClipboard}
          onChange={(value) => onShortcutChange('toggleClipboard', value)}
          onReset={() => onShortcutChange('toggleClipboard', defaultShortcuts.toggleClipboard)}
        />
        
        <ModifierShortcut
          label="剪切板内容快速粘贴"
          defaultModifier={defaultShortcuts.clipboardQuickPasteModifier}
          value={shortcuts.clipboardQuickPasteModifier}
          onChange={(value) => onShortcutChange('clipboardQuickPasteModifier', value)}
          onReset={() => onShortcutChange('clipboardQuickPasteModifier', defaultShortcuts.clipboardQuickPasteModifier)}
        />
        
        <ModifierShortcut
          label="收藏的剪切板内容快速粘贴"
          defaultModifier={defaultShortcuts.favoriteQuickPasteModifier}
          value={shortcuts.favoriteQuickPasteModifier}
          onChange={(value) => onShortcutChange('favoriteQuickPasteModifier', value)}
          onReset={() => onShortcutChange('favoriteQuickPasteModifier', defaultShortcuts.favoriteQuickPasteModifier)}
        />
        
        <KeyboardShortcut
          label="粘贴"
          defaultShortcut={defaultShortcuts.paste}
          value={shortcuts.paste}
          onChange={(value) => onShortcutChange('paste', value)}
          onReset={() => onShortcutChange('paste', defaultShortcuts.paste)}
        />
        
        <KeyboardShortcut
          label="粘贴为文本"
          defaultShortcut={defaultShortcuts.pasteAsText}
          value={shortcuts.pasteAsText}
          onChange={(value) => onShortcutChange('pasteAsText', value)}
          onReset={() => onShortcutChange('pasteAsText', defaultShortcuts.pasteAsText)}
        />
        
        <KeyboardShortcut
          label="收藏"
          defaultShortcut={defaultShortcuts.favorite}
          value={shortcuts.favorite}
          onChange={(value) => onShortcutChange('favorite', value)}
          onReset={() => onShortcutChange('favorite', defaultShortcuts.favorite)}
        />
        
        <KeyboardShortcut
          label="复制"
          defaultShortcut={defaultShortcuts.copy}
          value={shortcuts.copy}
          onChange={(value) => onShortcutChange('copy', value)}
          onReset={() => onShortcutChange('copy', defaultShortcuts.copy)}
        />
        
        <KeyboardShortcut
          label="复制为文本"
          defaultShortcut={defaultShortcuts.copyAsText}
          value={shortcuts.copyAsText}
          onChange={(value) => onShortcutChange('copyAsText', value)}
          onReset={() => onShortcutChange('copyAsText', defaultShortcuts.copyAsText)}
        />
      </SettingSection>
    </div>
  );
}

export { defaultShortcuts };