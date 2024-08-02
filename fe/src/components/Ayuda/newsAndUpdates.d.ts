import { ChatIcon, DnsIcon, DashboardIcon, DarkModeIcon, BugReportIcon, LightbulbIcon } from './icons';
interface NewsItem {
    icon: typeof ChatIcon | typeof DnsIcon | typeof DashboardIcon | typeof DarkModeIcon | typeof BugReportIcon | typeof LightbulbIcon;
    title: string;
    description: string;
}
export declare const newsAndUpdates: NewsItem[];
export {};
