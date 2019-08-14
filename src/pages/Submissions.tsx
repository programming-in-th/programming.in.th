/* React */
import React from 'react';

/* Material Table */
import MaterialTable from 'material-table';

/* Redux */
import { ISubmission } from '../redux/types/task';

interface ISubmissionsPageProps {
	submissionsList: ISubmission[],
	status: string,
	onInitialLoad: () => void,
}

class Submissions extends React.Component<ISubmissionsPageProps, any> {
	render() {
		return (
			<div style={{ maxWidth: '100%', margin: '0 13px' }}>
				<MaterialTable
					columns={[
						{ title: 'Date', field : 'timestamp'},
						{ title : 'User', field: 'username' },
						{ title: 'Problem', field: 'problem_id' },
						{ title: 'Language', field: 'language' },
						{ title: 'Status', field: 'status' },
						{ title: 'Points', field: 'points' },
						{ title: 'Time', field: 'time' },
						{ title: 'Memory', field: 'memory' },
					]}
					data={this.props.submissionsList}
					title="Submissions"
				/>
			</div>
		);
	}
}

export const SubmissionsPage = Submissions;