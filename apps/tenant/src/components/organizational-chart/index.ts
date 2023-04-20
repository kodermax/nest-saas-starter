import dynamic from 'next/dynamic';

const OrganizationalChart = dynamic(() => import('./OrganizationalChart'), { ssr: false });

export * from './types';

export default OrganizationalChart;
