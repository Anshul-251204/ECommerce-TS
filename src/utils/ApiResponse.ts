class ApiResponse {
	constructor(
		public data: any,
		public message: string,
		public success: boolean = true
	) {
        this.data = data;
        this.message = message
        this.success = true;
    }
}

export default ApiResponse
