import { Button } from '@/app/components/ui/button';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { ExternalLink, Mail, FileText, Shield } from 'lucide-react';

interface AboutSettingsProps {
  settings?: any;
  onSettingChange?: (key: string, value: any) => void;
}

export function AboutSettings({ settings, onSettingChange }: AboutSettingsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">关于</h2>
        
        {/* 应用信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">📋</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            一步-桌面效率工具
          </h3>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              版本 v1.2.3
            </span>
          </div>
        </div>

        {/* 版本信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">版本信息</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">当前版本：</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">v1.2.3</span>
            </div>
          </div>
        </div>

        {/* 链接 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">相关链接</h4>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="h-4 w-4 mr-2" />
              官方网站
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              使用文档
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="h-4 w-4 mr-2" />
              联系支持
            </Button>
          </div>
        </div>

        {/* 许可与隐私 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">许可与隐私</h4>
          <div className="space-y-3">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                本应用遵守隐私政策，所有数据仅存储在本地设备，不会上传到云端
              </AlertDescription>
            </Alert>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                许可协议
              </Button>
              <Button variant="outline" className="flex-1">
                隐私政策
              </Button>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              © 2026 OneStepApp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}