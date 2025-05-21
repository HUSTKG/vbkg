import type { Meta, StoryObj } from '@storybook/react';
import {
	ChevronRight,
	Database, Settings, Users
} from 'lucide-react';
import AppLayout from './index';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const meta: Meta<typeof AppLayout> = {
	title: 'Layout/AppLayout',
	component: AppLayout,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppLayout>;

// Sample menu items
const defaultMenuItems = [
	{
		title: "Knowledge Management",
		icon: <Database size={20} />,
		submenu: [
			{ title: "Resolve Conflicts", path: "/resolve-conflicts" },
			{ title: "Review New Data", path: "/review-data" },
			{ title: "Add Data Manually", path: "/add-data" }
		]
	},
	{
		title: "Administration",
		icon: <Settings size={20} />,
		submenu: [
			{ title: "Monitor Performance", path: "/monitor" },
			{ title: "Manage Users", path: "/users" },
			{ title: "Manage Ontology", path: "/ontology" },
			{ title: "Configure Data Sources", path: "/data-sources" },
			{ title: "Configure Data Pipeline", path: "/pipeline" }
		]
	},
	{
		title: "User Interaction",
		icon: <Users size={20} />,
		submenu: [
			{ title: "Send Feedback", path: "/feedback" },
			{ title: "Manage API Keys", path: "/api-keys" },
			{ title: "Query Knowledge", path: "/query" },
			{ title: "Custom Visualizations", path: "/visualizations" }
		]
	}
];

// Simple dashboard content for demonstration
const DashboardContent = () => (
	<div>
		<div className="mb-6">
			<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
			<p className="text-gray-600 dark:text-gray-400 mt-1">Overview of your Knowledge Graph</p>
		</div>

		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			{[
				{ title: 'Total Nodes', value: '12,543', color: 'bg-blue-500' },
				{ title: 'Total Relations', value: '48,294', color: 'bg-green-500' },
				{ title: 'Pending Conflicts', value: '23', color: 'bg-amber-500' },
				{ title: 'Active Users', value: '158', color: 'bg-purple-500' }
			].map((stat, index) => (
				<div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
					<div className="flex justify-between items-center">
						<div>
							<p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
							<h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
						</div>
						<div className={`p-3 rounded-full ${stat.color} text-white`}>
							<ChevronRight size={20} />
						</div>
					</div>
				</div>
			))}
		</div>

		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<Card>
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-gray-600 dark:text-gray-400">Activity list would appear here</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>System Performance</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-gray-600 dark:text-gray-400">Performance metrics would appear here</p>
				</CardContent>
			</Card>
		</div>
	</div>
);

export const Default: Story = {
	args: {
		children: <DashboardContent />,
		menuItems: defaultMenuItems,
		userName: 'John Doe',
		notificationCount: 3,
	},
};

export const WithCustomUser: Story = {
	args: {
		children: <DashboardContent />,
		menuItems: defaultMenuItems,
		userName: 'Jane Smith',
		userAvatar: (
			<div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-medium">
				JS
			</div>
		),
		notificationCount: 5,
	},
};

export const WithSearch: Story = {
	args: {
		children: <DashboardContent />,
		menuItems: defaultMenuItems,
		userName: 'Alex Johnson',
		onSearch: (query) => console.log(`Searching for: ${query}`),
	},
};

export const WithCollapsedSidebar: Story = {
	render: () => {
		const CollapsibleLayout = () => {
			return (
				<AppLayout
					menuItems={defaultMenuItems}
					userName="Robert Davis"
					notificationCount={2}
					children={<DashboardContent />}
				/>
			);
		};

		return <CollapsibleLayout />;
	},
};

export const WithDetailedContent: Story = {
	render: () => {
		const DetailedContent = () => (
			<div>
				<div className="mb-6">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Knowledge Graph Management</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-1">Detailed view of your knowledge graph structure</p>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
					<h2 className="text-lg font-medium mb-4">Graph Statistics</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
							<p className="text-sm text-gray-500 dark:text-gray-400">Total Nodes</p>
							<p className="text-xl font-bold">12,543</p>
						</div>
						<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
							<p className="text-sm text-gray-500 dark:text-gray-400">Total Relations</p>
							<p className="text-xl font-bold">48,294</p>
						</div>
						<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
							<p className="text-sm text-gray-500 dark:text-gray-400">Node Types</p>
							<p className="text-xl font-bold">24</p>
						</div>
						<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
							<p className="text-sm text-gray-500 dark:text-gray-400">Relation Types</p>
							<p className="text-xl font-bold">36</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2">
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-80">
							<h2 className="text-lg font-medium mb-4">Graph Visualization</h2>
							<div className="bg-gray-100 dark:bg-gray-700 h-60 rounded-lg flex items-center justify-center">
								<p className="text-gray-500 dark:text-gray-400">Graph visualization would appear here</p>
							</div>
						</div>
					</div>

					<div>
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
							<h2 className="text-lg font-medium mb-4">Recent Updates</h2>
							<ul className="space-y-3">
								{[1, 2, 3, 4].map((item) => (
									<li key={item} className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
										<p className="text-sm font-medium">Update {item}</p>
										<p className="text-xs text-gray-500">2 hours ago</p>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);

		return (
			<AppLayout
				menuItems={defaultMenuItems}
				userName="Sarah Thompson"
				userAvatar="https://i.pravatar.cc/300?img=5"
				notificationCount={0}
				onSearch={(query) => console.log(`Searching for: ${query}`)}
				onNotificationClick={() => console.log('Notifications clicked')}
			>
				<DetailedContent />
			</AppLayout>
		);
	},
};

// Example of mobile responsive layout
export const MobileResponsive: Story = {
	parameters: {
		viewport: {
			defaultViewport: 'mobile1',
		},
	},
	args: {
		children: <DashboardContent />,
		menuItems: defaultMenuItems,
		userName: 'Mobile User',
		notificationCount: 2,
	},
};
