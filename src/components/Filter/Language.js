import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import qs from 'query-string';
import { useAutoCallback as useCallback } from 'hooks.macro';

import { getUsedLanguages } from '~/redux/organization/selectors';
import routerListenerHoC from '~/components/tools/routerListenerHoC';
import { genQueryString } from '~/tools';

const LanguageFilter = ({ languages, history, location, lang }) =>
{
	const onChange = useCallback(newLang =>
		{
			if(lang === newLang)
				return;

			const params =
				{
					...qs.parse(location.search),
					page: null, // explicitly reset page
					lang: newLang,
				};
			history.push(genQueryString(params));
		});

	return <Select
		value={lang}
		{...{ onChange }}
		className="cch-filter-lang"
		placeholder="language"
		allowClear
	>
		<For each="lang" of={languages}>
			<Select.Option
				key={lang}
				value={lang}
			>
				{lang}
			</Select.Option>
		</For>
	</Select>;
};

const redux = connect(
	st => ({ languages: getUsedLanguages(st.organization) }),
);

const mapQuery = ({ location }) =>
{
	return { lang: qs.parse(location.search).lang };
};

export default LanguageFilter
	|> memo
	|> redux
	|> routerListenerHoC(mapQuery);