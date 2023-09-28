import React from 'react';
import {
	AssetsUnderManagement,
	LIGHT_COLORS,
} from '@envlibs/env-widget-library/dist';
import DataParser from '@envlibs/env-react-component-library/dist/utils/DataParser';
import '@envlibs/env-design-system/dist/index.css';

const AUM = () => {
	const assetsUnderManagementChartStub = {
		chartData: [
			{ year: '2021-12-01', price: 47275466676 },
			{ year: '2022-1-01', price: 45333987874 },
			{ year: '2022-2-01', price: 24803143203 },
			{ year: '2022-3-01', price: 24544328873 },
			{ year: '2022-4-01', price: 41580126593 },
			{ year: '2022-5-01', price: 41320378204 },
		],
		tableData: [
			{ title: 'APM', value: '9950636938.4542' },
			{ title: 'Brokerage', value: '9453105091.42' },
			{ title: 'Annuity', value: '5472850316.33' },
			{ title: 'FSP', value: '2296300831.00' },
			{ title: 'UMA', value: '1722225623.422' },
			{ title: 'SMA', value: '1339508818.4567' },
		],
		total: '15308672213.3422',

		seeMoreCount: 5,
	};

	const getAssetsUnderManagement = async () => {
		try {
			let response = await new Promise((resolve, reject) =>
				setTimeout(() => {
					let _data = {
						...assetsUnderManagementChartStub,
						chartData: DataParser.frameDataForChart(
							assetsUnderManagementChartStub.chartData,
							[
								{
									name: 'year',
									formatter: {
										type: 'date',
										format: '%3m%2y',
									},
								},
								{
									name: 'price',
									formatter: { type: 'number' },
								},
							]
						),
					};
					resolve({ data: _data });
				}, 1000)
			);
			return response;
		} catch (err) {
			return Promise.reject(err);
		}
	};

	const listeners = {
		fetchData: getAssetsUnderManagement,
	};

	return (
		<>
			<AssetsUnderManagement
				id='assetsUnderManagement'
				name='AssetsUnderManagement'
				listeners={listeners}
				chartHeight='200px'
				colorMode={LIGHT_COLORS['assetsUnderManagement']}
				locale={'en-US'}
			/>
		</>
	);
};

export default AUM;
