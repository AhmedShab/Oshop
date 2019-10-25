import { map } from 'rxjs/operators';
import { AngularFireList } from '@angular/fire/database';

export const snapshotChanges = (list: AngularFireList<any>) => {
  return list.snapshotChanges().pipe(
    map(changes => {
      return changes.map(c => ({
        key: c.key,
        ...c.payload.val()
      }));
    })
  );
};
