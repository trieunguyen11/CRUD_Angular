import { Injectable } from '@angular/core';
import { Browser } from 'protractor';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
@Injectable({
  // chúng ta sử dụng @Injectable với các kiểu dữ liệu tự định nghĩa – class mà chúng ta tạo ra
  providedIn: 'root'
})

// TokenStorageService: dùng đề quản lý Token trong Browser's sessionStorage
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }
  signOut() {
    // Để xóa tất cả item trong sessionStorage chúng ta sử dụng cú pháp sau:
    window.sessionStorage.clear();
    //window.sessionStorage: Lưu trữ dữ liệu cho một phiên làm việc, có nghĩa dữ liệu sẽ bị mất khi bạn tắt browser
  }
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    console.log(token);
    // Thêm mới một dữ liệu vào sessionStorage
    // .setItem ($key, $value)
    //  $key là tên khóa của dữ liệu cần thêm vào (tương tự như table trong CSDL).
    //  $value là giá trị của $key trên.
    // Lưu ý: Nếu như trong localStorage đã tồn tại key đó rồi thì nó sẽ nhận giá trị của lần set cuối cùng.
  }

  public getToken(): string {
    // Để lấy một dữ liệu trong sessionStorage chúng ta sử dụng phương thức getItem() 
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUSername(username: string) {
    // -Để xóa một item trong localStorage chúng ta sử dụng cú pháp:: removeItem
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    //JSON.stringify: chuyển một Object sang JSON
    // json: là một kiểu định dạng dũ liệu tuân theo một quy định nhất định
    // mà hầu hết các ngôn ngũ lập trình hiện nay đều có thể đọc dc
    //    + json sử dụng các cặp key-value để sử dụng dữ liệu
  }
  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      // JSON.parse: sao chép một Object mà không ảnh hưởng đến Object cũ
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }
}