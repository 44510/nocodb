import {
  CacheDelDirection,
  CacheGetType,
  CacheScope,
  MetaTable
} from '../utils/globals';
import Noco from '../noco/Noco';
import NocoCache from '../noco-cache/NocoCache';
import extractProps from '../noco/meta/helpers/extractProps';
import { ProjectUpdateRequestType } from 'nocodb-sdk';

export default class ProjectUser {
  project_id: string;
  fk_user_id: string;
  roles?: string;
  starred?: boolean;
  pinned?: boolean;
  group?: string;
  order?: number;
  hidden?: boolean;
  opened_date?: string | number | Date;

  constructor(data: ProjectUser) {
    Object.assign(this, data);
  }

  public static async insert(
    projectUser: Partial<ProjectUser & { created_at?: any; updated_at?: any }>,
    ncMeta = Noco.ncMeta
  ) {
    const { project_id, fk_user_id } = await ncMeta.metaInsert2(
      null,
      null,
      MetaTable.PROJECT_USERS,
      {
        fk_user_id: projectUser.fk_user_id,
        project_id: projectUser.project_id,
        roles: projectUser.roles,
        created_at: projectUser.created_at,
        updated_at: projectUser.updated_at,
        opened_date: ncMeta.knex?.fn?.now()
      },
      true
    );

    // del count
    await NocoCache.del(`${CacheScope.PROJECT_USER}:${fk_user_id}:count`);

    return this.get(project_id, fk_user_id, ncMeta);
  }

  // public static async update(id, user: Partial<ProjectUser>, ncMeta = Noco.ncMeta) {
  //   // return await ncMeta.metaUpdate(null, null, MetaTable.USERS, id, insertObj);
  // }
  static async get(projectId: string, userId: string, ncMeta = Noco.ncMeta) {
    let projectUser =
      projectId &&
      userId &&
      (await NocoCache.get(
        `${CacheScope.PROJECT_USER}:${projectId}:${userId}`,
        CacheGetType.TYPE_OBJECT
      ));
    if (!projectUser) {
      projectUser = await ncMeta.metaGet2(null, null, MetaTable.PROJECT_USERS, {
        fk_user_id: userId,
        project_id: projectId
      });
      await NocoCache.set(
        `${CacheScope.PROJECT_USER}:${projectId}:${userId}`,
        projectUser
      );
    }

    return projectUser && new ProjectUser(projectUser);
  }

  public static async getUsersList(
    {
      project_id,
      limit = 25,
      offset = 0,
      query
    }: {
      project_id: string;
      limit: number;
      offset: number;
      query?: string;
    },
    ncMeta = Noco.ncMeta
  ) {
    const queryBuilder = ncMeta
      .knex(MetaTable.USERS)
      .select(
        `${MetaTable.USERS}.id`,
        `${MetaTable.USERS}.email`,
        `${MetaTable.USERS}.invite_token`,
        `${MetaTable.USERS}.roles as main_roles`,
        `${MetaTable.PROJECT_USERS}.project_id`,
        `${MetaTable.PROJECT_USERS}.roles as roles`
      )
      .offset(offset);

    if (limit !== Infinity) {
      queryBuilder.limit(limit);
    }

    if (query) {
      queryBuilder.where('email', 'like', `%${query.toLowerCase?.()}%`);
    }

    queryBuilder.leftJoin(MetaTable.PROJECT_USERS, function() {
      this.on(
        `${MetaTable.PROJECT_USERS}.fk_user_id`,
        '=',
        `${MetaTable.USERS}.id`
      ).andOn(
        `${MetaTable.PROJECT_USERS}.project_id`,
        '=',
        ncMeta.knex.raw('?', [project_id])
      );
    });

    return await queryBuilder;
  }

  public static async getUsersCount(
    {
      query
    }: {
      query?: string;
    },
    ncMeta = Noco.ncMeta
  ): Promise<number> {
    const qb = ncMeta.knex(MetaTable.USERS);

    if (query) {
      qb.where('email', 'like', `%${query.toLowerCase?.()}%`);
    }

    return (await qb.count('id', { as: 'count' }).first()).count;
  }

  static async update(projectId, userId, roles: string, ncMeta = Noco.ncMeta) {
    // get existing cache
    const key = `${CacheScope.PROJECT_USER}:${projectId}:${userId}`;
    const o = await NocoCache.get(key, CacheGetType.TYPE_OBJECT);
    if (o) {
      o.roles = roles;
      // set cache
      await NocoCache.set(key, o);
    }
    // set meta
    return await ncMeta.metaUpdate(
      null,
      null,
      MetaTable.PROJECT_USERS,
      {
        roles
      },
      {
        fk_user_id: userId,
        project_id: projectId
      }
    );
  }

  static async delete(projectId: string, userId, ncMeta = Noco.ncMeta) {
    // await NocoCache.deepDel(
    //   CacheScope.PROJECT_USER,
    //   `${CacheScope.PROJECT_USER}:${projectId}:${userId}`,
    //   CacheDelDirection.CHILD_TO_PARENT
    // );
    const { email } = await ncMeta.metaGet2(null, null, MetaTable.USERS, {
      id: userId
    });
    if (email) {
      await NocoCache.delAll(CacheScope.USER, `${email}*`);
    }
    // del project user
    await NocoCache.del(`${CacheScope.PROJECT_USER}:${projectId}:${userId}`);
    // del count
    await NocoCache.del(`${CacheScope.PROJECT_USER}:${userId}:count`);
    // del list
    await NocoCache.deepDel(
      CacheScope.PROJECT_USER,
      `${CacheScope.PROJECT_USER}:${userId}`,
      CacheDelDirection.PARENT_TO_CHILD
    );
    return await ncMeta.metaDelete(null, null, MetaTable.PROJECT_USERS, {
      fk_user_id: userId,
      project_id: projectId
    });
  }

  // triggered from Project.ts
  static async deleteFromProject(projectId) {
    // del projectUser
    await NocoCache.del(`${CacheScope.PROJECT_USER}:${projectId}`);
    // get user lists
    const projectUsers = await this.getUsersList(
      {
        project_id: projectId,
        limit: Infinity,
        offset: 0
      },
      Noco.ncMeta
    );
    // delete each user count
    for (const user of projectUsers) {
      // del projectUser count
      await NocoCache.del(`${CacheScope.PROJECT_USER}:${user.id}:count`);
      // del projectUser
      await NocoCache.del(`${CacheScope.PROJECT_USER}:${projectId}:${user.id}`);
      // del list
      await NocoCache.deepDel(
        CacheScope.PROJECT_USER,
        `${CacheScope.PROJECT_USER}:${user.id}:list`,
        CacheDelDirection.PARENT_TO_CHILD
      );
    }
  }

  static async userProjectList(
    userId,
    {
      limit = 25,
      offset = 0,
      query = null,
      filterShared = false,
      filterStarred = false,
      recentlyOpened = false
    } = {},
    ncMeta = Noco.ncMeta
  ) {
    let userProjectList = await NocoCache.getList(CacheScope.PROJECT_USER, [
      userId
    ]);
    if (!userProjectList.length) {
      const qb = ncMeta
        .knex(MetaTable.PROJECT)
        .innerJoin(
          MetaTable.PROJECT_USERS,
          `${MetaTable.PROJECT}.id`,
          `${MetaTable.PROJECT_USERS}.project_id`
        )
        .innerJoin(
          MetaTable.USERS,
          `${MetaTable.USERS}.id`,
          `${MetaTable.PROJECT_USERS}.fk_user_id`
        )
        .innerJoin(
          MetaTable.BASES,
          `${MetaTable.BASES}.project_id`,
          `${MetaTable.PROJECT}.id`
        )
        // extract owner email
        .select(
          ncMeta
            .knex(`${MetaTable.PROJECT_USERS} as pu`)
            .select('admin.email')
            .innerJoin(
              `${MetaTable.USERS} as admin`,
              `pu.fk_user_id`,
              `admin.id`
            )
            .where('pu.project_id', ncMeta.knex.raw(`${MetaTable.PROJECT}.id`))
            .where('pu.roles', 'owner')
            .first()
            .as('owner_email')
        )

        .select(`${MetaTable.PROJECT}.id`)
        .select(`${MetaTable.PROJECT}.title`)
        .select(`${MetaTable.PROJECT}.prefix`)
        .select(`${MetaTable.PROJECT}.description`)
        .select(`${MetaTable.PROJECT}.meta`)
        .select(`${MetaTable.PROJECT}.color`)

        .select(`${MetaTable.PROJECT_USERS}.starred`)
        .select(`${MetaTable.PROJECT_USERS}.roles`)
        .select(`${MetaTable.PROJECT_USERS}.pinned`)
        .select(`${MetaTable.PROJECT_USERS}.group`)
        .select(`${MetaTable.PROJECT_USERS}.order`)
        .select(`${MetaTable.PROJECT_USERS}.hidden`)

        .select(`${MetaTable.BASES}.type as data_source_type`)

        .orderBy(`${MetaTable.PROJECT_USERS}.order`)
        .where(`${MetaTable.PROJECT_USERS}.fk_user_id`, userId)
        .where(`${MetaTable.PROJECT}.deleted`, false)

        .offset(offset)
        .limit(limit);

      if (query) {
        qb.where(`${MetaTable.PROJECT}.title`, 'like', `%${query}%`);
      }

      if (filterShared) {
        qb.whereNot(`${MetaTable.PROJECT_USERS}.roles`, 'owner');
      }
      if (filterStarred) {
        qb.where(`${MetaTable.PROJECT_USERS}.starred`, true);
      }
      if (recentlyOpened) {
        qb.orderBy(`${MetaTable.PROJECT_USERS}.opened_date`, 'desc');
      } else {
        // todo: sort by order
        qb.orderBy(`${MetaTable.PROJECT}.created_at`, 'desc');
      }
      userProjectList = await qb;
      await NocoCache.setList(
        CacheScope.PROJECT_USER,
        [userId],
        userProjectList
      );
    }
    return userProjectList;
  }

  static async userProjectCount(
    userId,
    { query = null, filterShared = false, filterStarred = false } = {},
    ncMeta = Noco.ncMeta
  ) {
    let userProjectCount =
      userId &&
      (await NocoCache.get(
        `${CacheScope.PROJECT_USER}:${userId}:count`,
        CacheGetType.TYPE_OBJECT
      ));
    if (!userProjectCount) {
      const qb = ncMeta
        .knex(MetaTable.PROJECT)
        .innerJoin(
          MetaTable.PROJECT_USERS,
          `${MetaTable.PROJECT}.id`,
          `${MetaTable.PROJECT_USERS}.project_id`
        )
        .innerJoin(
          MetaTable.USERS,
          `${MetaTable.USERS}.id`,
          `${MetaTable.PROJECT_USERS}.fk_user_id`
        )
        .innerJoin(
          MetaTable.BASES,
          `${MetaTable.BASES}.project_id`,
          `${MetaTable.PROJECT}.id`
        )

        .count(`${MetaTable.PROJECT}.id`, { as: 'count' })
        .where(`${MetaTable.PROJECT_USERS}.fk_user_id`, userId)
        .where(`${MetaTable.PROJECT}.deleted`, false)
        .first();

      if (query) {
        qb.where(`${MetaTable.PROJECT}.title`, 'like', `%${query}%`);
      }

      if (filterShared) {
        qb.whereNot(`${MetaTable.PROJECT_USERS}.roles`, 'owner');
      }
      if (filterStarred) {
        qb.where(`${MetaTable.PROJECT_USERS}.starred`, true);
      }
      userProjectCount = (await qb)?.count;
      await NocoCache.set(
        `${CacheScope.PROJECT_USER}:${userId}:count`,
        userProjectCount
      );
    }
    return userProjectCount;
  }

  static async userProjectUpdate(
    userId: string,
    projectId: string,
    body: ProjectUpdateRequestType,
    ncMeta = Noco.ncMeta
  ) {
    const updateObj = extractProps(body, [
      'starred',
      'pinned',
      'group',
      'order',
      'hidden'
    ]);

    // get existing cache
    const key = `${CacheScope.PROJECT_USER}:${projectId}:${userId}`;
    let o = await NocoCache.get(key, CacheGetType.TYPE_OBJECT);
    if (o) {
      o = { ...o, ...updateObj };
      // set cache
      await NocoCache.set(key, o);
    }
    // set meta
    await ncMeta.metaUpdate(null, null, MetaTable.PROJECT_USERS, updateObj, {
      fk_user_id: userId,
      project_id: projectId
    });
    return true;
  }

  static async userProjectUpdateOpenedDate(
    userId: string,
    projectId: string,
    ncMeta = Noco.ncMeta
  ) {
    // del projectUser
    await NocoCache.del(`${CacheScope.PROJECT_USER}:${projectId}:${userId}`);
    // del projectUser count
    await NocoCache.del(`${CacheScope.PROJECT_USER}:${userId}:count`);
    // del list
    await NocoCache.del(`${CacheScope.PROJECT_USER}:${userId}:list`);
    // set meta
    await ncMeta.metaUpdate(
      null,
      null,
      MetaTable.PROJECT_USERS,
      { opened_date: ncMeta.knex?.fn?.now() },
      {
        fk_user_id: userId,
        project_id: projectId
      }
    );
    return this.get(userId, projectId, ncMeta);
  }
}
