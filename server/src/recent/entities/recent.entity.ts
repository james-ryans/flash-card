export class RecentResponse {
    data: {
        text: string;
        translation: string;
    }[];

    constructor(data: { text: string; translation: string }[]) {
        this.data = data.map((item) => {
            return {
                text: item.text,
                translation: item.translation,
            };
        });
    }
}
