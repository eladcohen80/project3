export interface Group {
	group_id: number;
	group_name: string;
}

export interface Meeting {
	meeting_id: number;
	group_id: number;
	start_time: string;
	end_time: string;
	description: string;
    room: string;
}