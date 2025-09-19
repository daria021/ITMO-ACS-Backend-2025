import { Controller } from 'tsoa';

export abstract class BaseController extends Controller {
  protected getCurrentUserId(): string | null {
    return (this as any).request?.user?.id || null;
  }

  protected setStatusCode(status: number): void {
    this.setStatus(status);
  }
}
