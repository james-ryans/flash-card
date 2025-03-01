export interface Recent {
    text: string;
    translation: string;
}

export class RecentResponse {
    data: Recent[];

    constructor(data: Recent[]) {
        this.data = data.map((item) => {
            return {
                text: item.text,
                translation: item.translation,
            };
        });
    }
}
