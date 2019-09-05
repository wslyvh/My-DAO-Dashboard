import { DaosStore } from "./daos.store";
import { DaosQuery } from "./daos.query";
import { Observable, zip } from "rxjs";
import Web3 from "web3";
import { BalanceService } from "../../backbone/balance.service";
import { first, flatMap, map } from "rxjs/operators";
import { MolochService } from "./moloch.service";
import { DaoInstanceState } from "../../backbone/State";

export class DaosService {
  private readonly store: DaosStore;
  readonly query: DaosQuery;
  private readonly balanceService$: Observable<BalanceService>;
  private readonly molochService$: Observable<MolochService>;

  constructor(watchedAddresses$: Observable<string[]>, web3$: Observable<Web3>, account$: Observable<string>) {
    this.store = new DaosStore({
      daos: []
    });
    this.store.setLoading(true);
    this.query = new DaosQuery(this.store);
    this.balanceService$ = web3$.pipe(map(web3 => new BalanceService(web3)));
    this.molochService$ = zip(web3$, this.balanceService$).pipe(map(p => new MolochService(p[0], p[1])));

    zip(watchedAddresses$, account$)
      .pipe(map(p => p[0].concat(p[1])))
      .pipe(flatMap(watchedAddresses => this.allWatched(watchedAddresses)))
      .subscribe(daos => {
        this.store.update({
          daos
        });
        this.store.setLoading(false);
      });
  }

  async allWatched(watchedAddresses: string[]): Promise<DaoInstanceState[]> {
    const daos = await Promise.all(watchedAddresses.map(address => this.allByAccount(address)));
    return daos.flat();
  }

  async allByAccount(address: string): Promise<DaoInstanceState[]> {
    const molochDaos$ = this.molochService$.pipe(
      flatMap(s => s.all(address)),
      first()
    );
    return molochDaos$.toPromise();
  }
}
