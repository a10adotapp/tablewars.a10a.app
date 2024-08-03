# tablewars.a10a.app

## Commands

### Prismaクライアントファイル生成

``` shell
npx prisma generate
```

### Prismaマイグレーションファイル生成

``` shell
npx prisma migrate dev --name ${NAME}
```

### Prismaマイグレーションファイル適用

``` shell
npx prisma db push --skip-generate
```
