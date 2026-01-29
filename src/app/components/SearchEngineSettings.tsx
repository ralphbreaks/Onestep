import { SettingSection } from "@/app/components/SettingSection";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { X, Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";

interface SearchEngineSettingsProps {
  settings: any;
  onSettingChange: (key: string, value: any) => void;
}

export function SearchEngineSettings({
  settings,
  onSettingChange,
}: SearchEngineSettingsProps) {
  const [editingEngine, setEditingEngine] = useState<
    string | null
  >(null);
  const [editForm, setEditForm] = useState({
    name: "",
    url: "",
    icon: "",
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newEngineForm, setNewEngineForm] = useState({
    id: "",
    name: "",
    url: "",
    icon: "",
    keywords: "",
  });

  const handleAddKeyword = (engine: string) => {
    const keyword = prompt(
      `请输入触发 ${settings.searchEngines[engine].name} 的关键词（如: gg, bd）:`,
    );
    if (keyword && keyword.trim()) {
      const updated = { ...settings.searchEngines };
      if (!updated[engine].keywords.includes(keyword.trim())) {
        updated[engine].keywords.push(keyword.trim());
        onSettingChange("searchEngines", updated);
      }
    }
  };

  const handleRemoveKeyword = (
    engine: string,
    keyword: string,
  ) => {
    const updated = { ...settings.searchEngines };
    updated[engine].keywords = updated[engine].keywords.filter(
      (k: string) => k !== keyword,
    );
    onSettingChange("searchEngines", updated);
  };

  const handleToggleEngine = (engine: string) => {
    const updated = { ...settings.searchEngines };
    updated[engine].enabled = !updated[engine].enabled;
    onSettingChange("searchEngines", updated);
  };

  const handleEditEngine = (engine: string) => {
    const config = settings.searchEngines[engine];
    setEditForm({
      name: config.name,
      url: config.url,
      icon: config.icon,
    });
    setEditingEngine(engine);
  };

  const handleSaveEdit = () => {
    if (editingEngine) {
      const updated = { ...settings.searchEngines };
      updated[editingEngine] = {
        ...updated[editingEngine],
        ...editForm,
      };
      onSettingChange("searchEngines", updated);
      setEditingEngine(null);
    }
  };

  const handleDeleteEngine = (engine: string) => {
    if (
      confirm(
        `确定要删除 ${settings.searchEngines[engine].name} 吗？`,
      )
    ) {
      const updated = { ...settings.searchEngines };
      delete updated[engine];
      onSettingChange("searchEngines", updated);

      // 如果删除的是默认搜索引擎，切换到第一个可用的
      if (settings.defaultSearchEngine === engine) {
        const firstEnabled = Object.keys(updated).find(
          (key) => updated[key].enabled,
        );
        if (firstEnabled) {
          onSettingChange("defaultSearchEngine", firstEnabled);
        }
      }
    }
  };

  const handleAddNewEngine = () => {
    if (
      !newEngineForm.id ||
      !newEngineForm.name ||
      !newEngineForm.url
    ) {
      alert("请填写所有必填字段");
      return;
    }

    if (settings.searchEngines[newEngineForm.id]) {
      alert("该ID已存在，请使用其他ID");
      return;
    }

    const updated = { ...settings.searchEngines };
    updated[newEngineForm.id] = {
      name: newEngineForm.name,
      url: newEngineForm.url,
      icon: newEngineForm.icon || "🔍",
      keywords: newEngineForm.keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k),
      enabled: true,
    };

    onSettingChange("searchEngines", updated);
    setIsAddingNew(false);
    setNewEngineForm({
      id: "",
      name: "",
      url: "",
      icon: "",
      keywords: "",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            网络搜索设置
          </h2>
          <Button onClick={() => setIsAddingNew(true)}>
            <Plus className="h-4 w-4 mr-2" />
            添加搜索引擎
          </Button>
        </div>

        <SettingSection
          title="搜索引擎管理"
          description="输入搜索引擎关键词 + 空格，激活搜索功能。输入搜索内容，按回车后调用浏览器进行搜索"
        >
          <div className="space-y-4">
            {Object.entries(settings.searchEngines).map(
              ([engine, config]: [string, any]) => (
                <div
                  key={engine}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-6 h-6 flex items-center justify-center text-xl flex-shrink-0">
                        {config.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                          {config.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {config.url}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditEngine(engine)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      {!config.isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDeleteEngine(engine)
                          }
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                      <label className="flex items-center gap-2 cursor-pointer ml-2">
                        <input
                          type="checkbox"
                          checked={config.enabled}
                          onChange={() =>
                            handleToggleEngine(engine)
                          }
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          启用
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        触发关键词
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAddKeyword(engine)}
                        className="h-7"
                        disabled={!config.enabled}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        添加
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {config.keywords.map(
                        (keyword: string) => (
                          <div
                            key={keyword}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-sm"
                          >
                            <span className="font-mono font-semibold">
                              {keyword}
                            </span>
                            {config.enabled && (
                              <button
                                onClick={() =>
                                  handleRemoveKeyword(
                                    engine,
                                    keyword,
                                  )
                                }
                                className="ml-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded p-0.5"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </SettingSection>
      </div>

      {/* 编辑搜索引擎对话框 */}
      <Dialog
        open={editingEngine !== null}
        onOpenChange={() => setEditingEngine(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑搜索引擎</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">名称</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    name: e.target.value,
                  })
                }
                placeholder="例如：Google"
              />
            </div>
            <div>
              <Label htmlFor="edit-url">搜索URL</Label>
              <Input
                id="edit-url"
                value={editForm.url}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    url: e.target.value,
                  })
                }
                placeholder="例如：https://www.google.com/search?q="
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                URL末尾会自动拼接搜索词
              </p>
            </div>
            <div>
              <Label htmlFor="edit-icon">
                图标（表情符号或文字）
              </Label>
              <Input
                id="edit-icon"
                value={editForm.icon}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    icon: e.target.value,
                  })
                }
                placeholder="例如：🔍 或其他表情符号"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditingEngine(null)}
            >
              取消
            </Button>
            <Button onClick={handleSaveEdit}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 添加新搜索引擎对话框 */}
      <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加新搜索引擎</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-id">ID（唯一标识）*</Label>
              <Input
                id="new-id"
                value={newEngineForm.id}
                onChange={(e) =>
                  setNewEngineForm({
                    ...newEngineForm,
                    id: e.target.value,
                  })
                }
                placeholder="例如：custom_engine"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                只能包含字母、数字和下划线
              </p>
            </div>
            <div>
              <Label htmlFor="new-name">名称*</Label>
              <Input
                id="new-name"
                value={newEngineForm.name}
                onChange={(e) =>
                  setNewEngineForm({
                    ...newEngineForm,
                    name: e.target.value,
                  })
                }
                placeholder="例如：我的搜索引擎"
              />
            </div>
            <div>
              <Label htmlFor="new-url">搜索URL*</Label>
              <Input
                id="new-url"
                value={newEngineForm.url}
                onChange={(e) =>
                  setNewEngineForm({
                    ...newEngineForm,
                    url: e.target.value,
                  })
                }
                placeholder="例如：https://example.com/search?q="
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                URL末尾会自动拼接搜索词
              </p>
            </div>
            <div>
              <Label htmlFor="new-icon">
                图标（表情符号或文字）
              </Label>
              <Input
                id="new-icon"
                value={newEngineForm.icon}
                onChange={(e) =>
                  setNewEngineForm({
                    ...newEngineForm,
                    icon: e.target.value,
                  })
                }
                placeholder="例如：🔍 或其他表情符号"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                留空将使用默认图标 🔍
              </p>
            </div>
            <div>
              <Label htmlFor="new-keywords">关键词</Label>
              <Input
                id="new-keywords"
                value={newEngineForm.keywords}
                onChange={(e) =>
                  setNewEngineForm({
                    ...newEngineForm,
                    keywords: e.target.value,
                  })
                }
                placeholder="例如：cs,custom（用逗号分隔）"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddingNew(false)}
            >
              取消
            </Button>
            <Button onClick={handleAddNewEngine}>添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}