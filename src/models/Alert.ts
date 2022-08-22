import { IAlertSeverity } from "../@types/IAlert";
import { useAlertStore } from "../store/alert";

export class Alert {

  private static store = useAlertStore();

  /**
   * Create a new Alert
   * @param severity This defines the alert's color
   * @param message The alert's message
   * @param title The alert's title
   */
  public static create(severity: IAlertSeverity, message: string, title?: string) {
    const alertId = new Date().getTime();
    Alert.store.open({
      id: alertId,
      severity,
      message,
      title
    })

    // Close after 3 seconds
    Alert.close(alertId, 3000);
  }

  /**
   * Close alert
   * @param id The alert ID to close
   * @param delay The delay in milliseconds 
   */
  public static close(id: number, delay = 0) {
    setTimeout(() => {
      Alert.store.close(id);
    }, delay);
  }

  // Define alert severity types
  public static SUCCESS: IAlertSeverity = {
    bg: 'bg-green-100',
    border: 'border-green-400',
    text: "text-green-700"
  }

  public static DANGER: IAlertSeverity = {
    bg: 'bg-red-100',
    border: 'border-red-400',
    text: "text-red-700"
  }

  public static PRIMARY: IAlertSeverity = {
    bg: 'bg-primary',
    border: 'border-primary',
    text: "text-white"
  }
}