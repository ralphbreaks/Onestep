interface SettingItemProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

export function SettingItem({ label, description, children }: SettingItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="flex-1 min-w-0">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );
}
