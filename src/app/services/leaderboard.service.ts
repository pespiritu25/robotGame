import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class LeaderboardService {
  localStorageKey = 'srg-leaderboard';

  create(data) {
    const list = this.listData();
    list.push(data);

    localStorage.setItem(this.localStorageKey, JSON.stringify(list));
  }

  listData() {
    const parseList: any[] = JSON.parse(localStorage.getItem(this.localStorageKey));
    return parseList?.length
      ? parseList.sort((a, b) => {
        return b.userScore - a.userScore
      })
      : [];
  }
}
