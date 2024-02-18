interface data {
    state: Object,
    setter?: Object,
    activity?: Object,
}
export class stateLibrary {
    private state: any
    constructor(data: data) {
        const { state, setter, activity } = data
        this.init(state, setter, activity)
    }
    private init(state: object | any, setter: object | any, activity?: object) {
        this.state = state
        let _Object = {} as any
        for (const key in setter) {
            _Object[key] = (message: any) => {
                setter[key](this.state, message)
            }
        }
        Object.assign(this, { setter: _Object })
        this.handleAction(activity)
    }
    private handleAction(activity?: object) {
        let list = activity as any
        for (const key in list) {
            list[key](this.state)
        }
    }
}