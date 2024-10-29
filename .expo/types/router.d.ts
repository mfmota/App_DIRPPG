/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(drawer)` | `/(drawer)/(tabs)` | `/(drawer)/(tabs)/calendario` | `/(drawer)/(tabs)/prazos` | `/(drawer)/calendario` | `/(drawer)/contato` | `/(drawer)/perfil` | `/(drawer)/prazos` | `/(drawer)/site` | `/(tabs)` | `/(tabs)/calendario` | `/(tabs)/prazos` | `/_sitemap` | `/cadastro` | `/calendario` | `/contato` | `/perfil` | `/prazos` | `/recuperarSenha` | `/site` | `/styles`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
