import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  public static readonly baseApi = 'http://localhost:8000/api/';

  constructor(private httpClient: HttpClient) {
  }

  getArticles() {
    return this.httpClient.get(ApiService.baseApi + 'articles');
  }

  getAllArticles() {
    return this.httpClient.get(ApiService.baseApi + 'articles/all');
  }

  login(userCredentials: any) {
    return this.httpClient.post(ApiService.baseApi + 'login', userCredentials, {withCredentials: true});
  }

  getLoggedInUserDetails() {
    return this.httpClient.get(ApiService.baseApi + 'user', {withCredentials: true});
  }

  updateVote(id: number, voteType: any) {
    return this.httpClient.post(ApiService.baseApi + 'articles/' + id + '/vote/', voteType, {withCredentials: true});
  }

  register(userDetails: any) {
    return this.httpClient.post(ApiService.baseApi + 'register', userDetails);
  }

  getRelatedArticles(id: number) {
    return this.httpClient.get(ApiService.baseApi + 'articles/' + id + '/similar');
  }

  logout() {
    return this.httpClient.post(ApiService.baseApi + 'logout', {}, {withCredentials: true})
  }

  postArticle(article: any) {
    return this.httpClient.post( ApiService.baseApi + 'articles/create/', article, {withCredentials: true})
  }

  forgotPassword(email: any) {
    return this.httpClient.post(ApiService.baseApi + 'forgot-password/', email)
  }

  resetPassword(resetData: any) {
    return this.httpClient.post(ApiService.baseApi + 'reset-password/', resetData)
  }

  getAllUsers() {
    return this.httpClient.get (ApiService.baseApi + 'total-user', {withCredentials: true})
  }

  promoteDemoteUser(id: number, promoteDemoteData: any) {
    return this.httpClient.post(ApiService.baseApi + 'user/' + id + '/promote-demote/', promoteDemoteData, {withCredentials: true})
  }

  deleteUser(userId: any) {
    return this.httpClient.delete(ApiService.baseApi + 'user/delete/' + userId, {withCredentials: true})
  }

  getApprovalPendingUsers() {
    return this.httpClient.get(ApiService.baseApi + 'approval-requests', {withCredentials: true})
  }

  approveUser( userId: any) {
    return this.httpClient.post(ApiService.baseApi + 'approve-user/', userId, {withCredentials: true})
  }

  completeArticle(id: number, data: any) {
    return this.httpClient.patch(ApiService.baseApi + 'articles/' + id + '/status/', data,  {withCredentials: true})
  }

  deleteArticle(id: number) {
    return this.httpClient.delete(ApiService.baseApi + 'articles/' + id + '/delete', {withCredentials: true});
  }

  updateArticle(id: number, data: any) {
    return this.httpClient.put(ApiService.baseApi + 'articles/' + id + '/edit/', data, {withCredentials: true});
  }

}
