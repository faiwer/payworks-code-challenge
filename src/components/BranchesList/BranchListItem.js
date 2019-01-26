import React, { memo } from 'react';
import { Card } from 'antd';

const BranchListItem = ({ branch }) =>
	<Card
		title={<h3>{branch.name}</h3>}
		className="cch-list-item cch-branch-listitem"
	>
		<ul className="cch-details-list">
			<li>
				<dt>Commit</dt>
				<dd>
					<a
						href={branch.commit.url}
						target="_blank"
					>
						{branch.commit.sha}
					</a>
				</dd>
			</li>
		</ul>
	</Card>;

export default BranchListItem |> memo;