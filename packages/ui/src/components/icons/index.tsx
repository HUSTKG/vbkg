import { ChevronDownIcon, DatabaseIcon, GitGraphIcon, HelpCircleIcon, HomeIcon, MonitorIcon, SettingsIcon, UserIcon, UsersIcon } from "lucide-react";

export const Home = (props: React.SVGProps<SVGSVGElement> & { title?: string }) => {
	return (
		<HomeIcon {...props} />
	);
};

export const User = (props: React.SVGProps<SVGSVGElement> & { title?: string }) => {
	return (
		<UserIcon {...props} />
	);
};

export const Settings = (props: React.SVGProps<SVGSVGElement> & { title?: string }) => {
	return (
		<SettingsIcon {...props} />
	);
};

export const Database = (props: React.SVGProps<SVGSVGElement> & { title?: string }) => {
	return (
		<DatabaseIcon {...props} />
	);
};

export const Users = (props: React.SVGProps<SVGSVGElement> & { title?: string }) => {
	return (
		<UsersIcon {...props} />
	);
};

export const HelpCircle = (props: React.SVGProps<SVGSVGElement> & { title?: string }) => {
	return (
		<HelpCircleIcon {...props} />
	);
}

export const Graph = (props: React.SVGProps<SVGSVGElement> & { title?: string }) => {
	return <GitGraphIcon
		{...props}
	/>
}

export const ChevronDown = (props: React.SVGProps<SVGSVGElement> & { title?: string }) => {
	return <ChevronDownIcon
		{...props}
	/>
}


export const Monitor = (props: React.SVGProps<SVGSVGElement> & { title?: string }) => {
	return <MonitorIcon
		{...props}
	/>
}
