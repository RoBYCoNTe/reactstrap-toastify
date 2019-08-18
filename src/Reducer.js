import Actions from "./Actions";

export default function toast(
  state = {
    queue: []
  },
  action
) {
  switch (action.type) {
    case Actions.ENUM.NOTIFY:
      return {
        queue: state.queue.concat([
          {
            icon: action.icon,
            title: action.title,
            message: action.message,
            color: action.color || "secondary",
            dismissable: action.dismissable || false,
            autoClose: action.autoClose || false,
            isOpen: true
          }
        ])
      };
    case Actions.ENUM.CLEAR:
      return {
        queue: []
      };
    case Actions.ENUM.DISMISS:
      return {
        queue: state.queue
          .filter(q => q === action.notification || q.isOpen)
          .map(q => ({
            ...q,
            isOpen: !(action.notification === q)
          }))
      };
    default:
      return state;
  }
}
