const NOTIFY = "RST_NOTIFY";
const CLEAR = "RST_CLEAR";
const DISMISS = "RST_DISMISS";

/**
 * Add new toast notification.
 * @param {Object} notification - Notification to be displayed.
 */
const notify = ({
  /** Icon to display on the left side of the title. */
  icon,
  /** Title to display. */
  title,
  /** Message to display. */
  message,
  /** Color theme to apply. */
  color,
  /** Indicates if the notification can be dismissed by the user. */
  dismissable,
  /** Indicates after how many milliseconds the toast notification must be closed automatically. */
  autoClose
}) => dispatch =>
  dispatch({
    type: NOTIFY,
    icon,
    title,
    message,
    color,
    dismissable,
    autoClose
  });

/**
 * Clear all notifications.
 */
const clear = () => ({ type: CLEAR });
/**
 * Dismiss specific notification.
 * @param {Array} queue
 */
const dismiss = notification => ({ type: DISMISS, notification });

export default {
  notify,
  clear,
  dismiss,
  ENUM: {
    NOTIFY,
    CLEAR,
    DISMISS
  }
};
