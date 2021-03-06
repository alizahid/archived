export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Time: any,
  JSON: any,
};

export type IAuthResult = {
   __typename?: 'AuthResult',
  idToken?: Maybe<Scalars['String']>,
  user?: Maybe<IUser>,
};

export type IBackup = {
   __typename?: 'Backup',
  id: Scalars['String'],
  createdAt: Scalars['Time'],
  status?: Maybe<IBackupStatus>,
  baseUrl?: Maybe<Scalars['String']>,
  sqlUrl?: Maybe<Scalars['String']>,
};

export type IBackupEdge = {
   __typename?: 'BackupEdge',
  node: IBackup,
};

export type IBackupPage = {
   __typename?: 'BackupPage',
  edges: Array<IBackupEdge>,
};

export enum IBackupStatus {
  InProgress = 'IN_PROGRESS',
  Done = 'DONE'
}

export type IBandwidth = {
   __typename?: 'Bandwidth',
  points: Array<IBandwidthPoint>,
  totalMB: Scalars['Int'],
};

export type IBandwidthPoint = {
   __typename?: 'BandwidthPoint',
  time: Scalars['Time'],
  bandwidthMB: Scalars['Int'],
};

export type IBranchDeleted = IServiceEvent & {
   __typename?: 'BranchDeleted',
  id: Scalars['String'],
  timestamp: Scalars['Time'],
  service: IService,
  deletedBranch: Scalars['String'],
  newBranch: Scalars['String'],
};

export type IBuild = {
   __typename?: 'Build',
  commitCreatedAt: Scalars['Time'],
  commitId: Scalars['String'],
  commitMessage: Scalars['String'],
  commitShortId: Scalars['String'],
  commitURL: Scalars['String'],
  createdAt: Scalars['Time'],
  id: Scalars['String'],
  status: Scalars['Int'],
  updatedAt: Scalars['Time'],
};

export type IBuildDeployEndReason = {
   __typename?: 'BuildDeployEndReason',
  buildFailed?: Maybe<IBuild>,
  newBuild?: Maybe<IBuild>,
  newDeploy?: Maybe<IDeploy>,
  failure?: Maybe<IFailureReason>,
  timedOutSeconds?: Maybe<Scalars['Int']>,
};

export type IBuildDeployTrigger = {
   __typename?: 'BuildDeployTrigger',
  firstBuild?: Maybe<Scalars['Boolean']>,
  clusterSynced?: Maybe<Scalars['Boolean']>,
  envUpdated?: Maybe<Scalars['Boolean']>,
  manual?: Maybe<Scalars['Boolean']>,
  user?: Maybe<IUser>,
  updatedProperty?: Maybe<Scalars['String']>,
  newCommit?: Maybe<Scalars['String']>,
  system?: Maybe<Scalars['Boolean']>,
  clearCache?: Maybe<Scalars['Boolean']>,
};

export type IBuildEnded = IServiceEvent & {
   __typename?: 'BuildEnded',
  id: Scalars['String'],
  service: IService,
  timestamp: Scalars['Time'],
  buildId: Scalars['String'],
  build?: Maybe<IBuild>,
  status: Scalars['Int'],
  reason?: Maybe<IBuildDeployEndReason>,
};

export type IBuildStarted = IServiceEvent & {
   __typename?: 'BuildStarted',
  id: Scalars['String'],
  service: IService,
  timestamp: Scalars['Time'],
  buildId: Scalars['String'],
  build?: Maybe<IBuild>,
  trigger?: Maybe<IBuildDeployTrigger>,
};

export type ICardInput = {
  last4: Scalars['String'],
  brand: Scalars['String'],
  token?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  region?: Maybe<Scalars['String']>,
};

export type ICharge = {
   __typename?: 'Charge',
  period: IPeriod,
  startTime: Scalars['Time'],
  endTime?: Maybe<Scalars['Time']>,
  name: Scalars['String'],
  billableId: Scalars['String'],
  chargeType: Scalars['String'],
  cost: Scalars['Int'],
  rate: Scalars['Int'],
  duration: Scalars['Int'],
  bandwidthGB: Scalars['Float'],
  deleted: Scalars['Boolean'],
  suspended: Scalars['Boolean'],
  serviceType: Scalars['String'],
};

export type ICronJob = IService & {
   __typename?: 'CronJob',
  id: Scalars['String'],
  autoDeploy: Scalars['Boolean'],
  baseDir?: Maybe<Scalars['String']>,
  build?: Maybe<IBuild>,
  buildCommand: Scalars['String'],
  command: Scalars['String'],
  canBill: Scalars['Boolean'],
  createdAt: Scalars['Time'],
  dockerfilePath?: Maybe<Scalars['String']>,
  env: IEnv,
  lastSuccessfulRunAt?: Maybe<Scalars['Time']>,
  metrics: IMetrics,
  name: Scalars['String'],
  notifyOnFail: ISetting,
  owner: IOwner,
  pendingPermissions: Array<IPendingPermission>,
  plan: IPlan,
  referentPermissions: Array<IPermission>,
  repo: IRepo,
  schedule: Scalars['String'],
  slug: Scalars['String'],
  sourceBranch: Scalars['String'],
  state: Scalars['String'],
  suspenders: Array<Scalars['String']>,
  type: Scalars['String'],
  updatedAt: Scalars['Time'],
  user: IUser,
  userFacingType: Scalars['String'],
  userFacingTypeSlug: Scalars['String'],
};


export type ICronJobMetricsArgs = {
  historyMinutes?: Maybe<Scalars['Int']>,
  step?: Maybe<Scalars['Int']>
};

export type ICronJobInput = {
  name: Scalars['String'],
  repo: IRepoInput,
  envId: Scalars['String'],
  buildCommand: Scalars['String'],
  branch: Scalars['String'],
  envVars?: Maybe<Array<IEnvVarInput>>,
  schedule: Scalars['String'],
  command: Scalars['String'],
  autoDeploy?: Maybe<Scalars['Boolean']>,
  baseDir?: Maybe<Scalars['String']>,
  dockerfilePath?: Maybe<Scalars['String']>,
  ownerId: Scalars['String'],
};

export type ICronJobRun = {
   __typename?: 'CronJobRun',
  id: Scalars['String'],
  startedAt?: Maybe<Scalars['Time']>,
  completedAt?: Maybe<Scalars['Time']>,
  status: Scalars['String'],
  triggeredByUser?: Maybe<Scalars['String']>,
  canceledByUser?: Maybe<Scalars['String']>,
};

export type ICronJobRunEnded = IServiceEvent & {
   __typename?: 'CronJobRunEnded',
  id: Scalars['String'],
  service: IService,
  timestamp: Scalars['Time'],
  cronJobRunId: Scalars['String'],
  cronJobRun?: Maybe<ICronJobRun>,
  status: Scalars['Int'],
  newRun?: Maybe<ICronJobRun>,
  reason?: Maybe<IFailureReason>,
  user?: Maybe<IUser>,
};

export type ICronJobRunStarted = IServiceEvent & {
   __typename?: 'CronJobRunStarted',
  id: Scalars['String'],
  service: IService,
  timestamp: Scalars['Time'],
  cronJobRunId: Scalars['String'],
  cronJobRun?: Maybe<ICronJobRun>,
  triggeredByUser?: Maybe<IUser>,
};

export type ICustomDomain = {
   __typename?: 'CustomDomain',
  id: Scalars['String'],
  name: Scalars['String'],
  server: IServer,
  redirectForName?: Maybe<Scalars['String']>,
  publicSuffix?: Maybe<Scalars['String']>,
  isApex: Scalars['Boolean'],
  verified: Scalars['Boolean'],
};

export type ICustomDomainInput = {
  name: Scalars['String'],
  serverId: Scalars['String'],
};

export type IDatabase = {
   __typename?: 'Database',
  id: Scalars['String'],
  name: Scalars['String'],
  backups?: Maybe<IBackupPage>,
  canBill: Scalars['Boolean'],
  createdAt: Scalars['Time'],
  databaseName: Scalars['String'],
  databaseUser: Scalars['String'],
  isMaxPlan: Scalars['Boolean'],
  metrics: IMetrics,
  password?: Maybe<Scalars['String']>,
  plan: Scalars['String'],
  status: IDatabaseStatus,
  storageAvailable?: Maybe<Scalars['String']>,
  storageTotal?: Maybe<Scalars['String']>,
  storageUsed?: Maybe<Scalars['String']>,
  storageUsedPercent?: Maybe<Scalars['String']>,
  type: IDatabaseType,
  pendingMaintenanceBy?: Maybe<Scalars['Time']>,
  maintenanceScheduledAt?: Maybe<Scalars['Time']>,
};


export type IDatabaseMetricsArgs = {
  historyMinutes?: Maybe<Scalars['Int']>,
  step?: Maybe<Scalars['Int']>
};

export type IDatabaseInput = {
  name: Scalars['String'],
  type: IDatabaseType,
  version: Scalars['String'],
  plan?: Maybe<Scalars['String']>,
  databaseName?: Maybe<Scalars['String']>,
  databaseUser?: Maybe<Scalars['String']>,
  ownerId: Scalars['String'],
};

export enum IDatabaseStatus {
  Creating = 'CREATING',
  Available = 'AVAILABLE',
  Unavailable = 'UNAVAILABLE'
}

export enum IDatabaseType {
  Postgresql = 'POSTGRESQL'
}

export type IDeploy = {
   __typename?: 'Deploy',
  branch: Scalars['String'],
  buildId: Scalars['String'],
  commitCreatedAt: Scalars['Time'],
  commitId: Scalars['String'],
  commitMessage: Scalars['String'],
  commitShortId: Scalars['String'],
  commitURL: Scalars['String'],
  createdAt: Scalars['Time'],
  finishedAt?: Maybe<Scalars['Time']>,
  finishedAtUnixNano: Scalars['String'],
  id: Scalars['String'],
  status: Scalars['Int'],
  updatedAt: Scalars['Time'],
};

export type IDeployEnded = IServiceEvent & {
   __typename?: 'DeployEnded',
  id: Scalars['String'],
  service: IService,
  timestamp: Scalars['Time'],
  deployId: Scalars['String'],
  deploy?: Maybe<IDeploy>,
  status: Scalars['Int'],
  reason?: Maybe<IBuildDeployEndReason>,
};

export type IDeployStarted = IServiceEvent & {
   __typename?: 'DeployStarted',
  id: Scalars['String'],
  service: IService,
  timestamp: Scalars['Time'],
  deployId: Scalars['String'],
  deploy?: Maybe<IDeploy>,
  trigger?: Maybe<IBuildDeployTrigger>,
};

export type IDisk = {
   __typename?: 'Disk',
  id: Scalars['String'],
  name: Scalars['String'],
  sizeGB: Scalars['Int'],
  mountPath: Scalars['String'],
  plan?: Maybe<IPlan>,
  fsOwnerID?: Maybe<Scalars['String']>,
  metrics: Array<Maybe<IDiskSample>>,
  snapshots?: Maybe<Array<Maybe<IDiskSnapshot>>>,
};


export type IDiskMetricsArgs = {
  historyMinutes?: Maybe<Scalars['Int']>,
  step?: Maybe<Scalars['Int']>
};

export type IDiskAction = {
   __typename?: 'DiskAction',
  created: Scalars['Boolean'],
  fromSizeGB?: Maybe<Scalars['Int']>,
  toSizeGB?: Maybe<Scalars['Int']>,
  deleted: Scalars['Boolean'],
};

export type IDiskEvent = IServiceEvent & {
   __typename?: 'DiskEvent',
  id: Scalars['String'],
  service: IService,
  timestamp: Scalars['Time'],
  action: IDiskAction,
};

export type IDiskInput = {
  name: Scalars['String'],
  sizeGB: Scalars['Int'],
  mountPath: Scalars['String'],
  fsOwnerID?: Maybe<Scalars['String']>,
};

export type IDiskSample = {
   __typename?: 'DiskSample',
  time: Scalars['Time'],
  usedBytes: Scalars['Int'],
  availableBytes: Scalars['Int'],
};

export type IDiskSnapshot = {
   __typename?: 'DiskSnapshot',
  createdAt: Scalars['Time'],
  snapshotKey: Scalars['String'],
};

export type IEnv = {
   __typename?: 'Env',
  id: Scalars['String'],
  isStatic: Scalars['Boolean'],
  language: Scalars['String'],
  name: Scalars['String'],
  sampleBuildCommand: Scalars['String'],
  sampleStartCommand: Scalars['String'],
};

export type IEnvGroup = {
   __typename?: 'EnvGroup',
  id: Scalars['String'],
  name: Scalars['String'],
  ownerId: Scalars['String'],
  userId: Scalars['String'],
  envVars: Array<IEnvVar>,
  createdAt: Scalars['Time'],
  updatedAt: Scalars['Time'],
};

export type IEnvVar = {
   __typename?: 'EnvVar',
  id: Scalars['String'],
  isFile: Scalars['Boolean'],
  key: Scalars['String'],
  value: Scalars['String'],
};

export type IEnvVarInput = {
  id?: Maybe<Scalars['String']>,
  isFile: Scalars['Boolean'],
  key: Scalars['String'],
  value: Scalars['String'],
};

export type IExtraInstancesChanged = IServiceEvent & {
   __typename?: 'ExtraInstancesChanged',
  id: Scalars['String'],
  timestamp: Scalars['Time'],
  service: IService,
  fromInstances: Scalars['Int'],
  toInstances: Scalars['Int'],
};

export type IFailureReason = {
   __typename?: 'FailureReason',
  evicted?: Maybe<Scalars['Boolean']>,
  nonZeroExit?: Maybe<Scalars['Int']>,
  oomKilled?: Maybe<IOomKilledData>,
  timedOutSeconds?: Maybe<Scalars['Int']>,
};

export type IGitBranch = {
   __typename?: 'GitBranch',
  name: Scalars['String'],
  latestCommit?: Maybe<IGitCommit>,
};

export type IGitCommit = {
   __typename?: 'GitCommit',
  id: Scalars['String'],
  url: Scalars['String'],
  shortId: Scalars['String'],
  message: Scalars['String'],
  createdAt: Scalars['Time'],
};

export type IGithubAuthResult = {
   __typename?: 'GithubAuthResult',
  githubUser?: Maybe<IGithubUser>,
  githubToken: Scalars['String'],
  idToken?: Maybe<Scalars['String']>,
  user?: Maybe<IUser>,
  userExists: Scalars['Boolean'],
};

export type IGithubUser = {
   __typename?: 'GithubUser',
  email: Scalars['String'],
  id: Scalars['String'],
  username: Scalars['String'],
  name: Scalars['String'],
};

export type IGitlabAuthResult = {
   __typename?: 'GitlabAuthResult',
  gitlabUser?: Maybe<IGitlabUser>,
  idToken?: Maybe<Scalars['String']>,
  user?: Maybe<IUser>,
  userExists: Scalars['Boolean'],
};

export type IGitlabUser = {
   __typename?: 'GitlabUser',
  id: Scalars['String'],
  email: Scalars['String'],
  username: Scalars['String'],
  name: Scalars['String'],
};

export enum IGitProvider {
  Github = 'GITHUB',
  Gitlab = 'GITLAB'
}

export type IGitRepo = {
   __typename?: 'GitRepo',
  id: Scalars['String'],
  provider: IGitProvider,
  providerId: Scalars['String'],
  isFork: Scalars['Boolean'],
  isPrivate: Scalars['Boolean'],
  name: Scalars['String'],
  nameWithOwner?: Maybe<Scalars['String']>,
  owner: IGitRepoOwner,
  shortDescriptionHTML?: Maybe<Scalars['String']>,
  url: Scalars['String'],
  defaultBranch: IGitBranch,
  languages?: Maybe<Array<Maybe<Scalars['String']>>>,
  branches: Array<IGitBranch>,
  suggestedEnv?: Maybe<Scalars['String']>,
  suggestedStartCommand?: Maybe<Scalars['String']>,
  suggestedBuildCommand?: Maybe<Scalars['String']>,
  suggestedPublishPath?: Maybe<Scalars['String']>,
  suggestedFramework?: Maybe<Scalars['String']>,
  suggestions?: Maybe<Array<Maybe<ISuggestion>>>,
};

export type IGitRepoOwner = {
   __typename?: 'GitRepoOwner',
  id: Scalars['String'],
  login: Scalars['String'],
};

export type IGoogleAuthResult = {
   __typename?: 'GoogleAuthResult',
  googleUser?: Maybe<IGoogleUser>,
  idToken?: Maybe<Scalars['String']>,
  user?: Maybe<IUser>,
};

export type IGoogleUser = {
   __typename?: 'GoogleUser',
  id: Scalars['String'],
  email: Scalars['String'],
  name: Scalars['String'],
};

export type IHeader = {
   __typename?: 'Header',
  id: Scalars['String'],
  createdAt: Scalars['Time'],
  key: Scalars['String'],
  path: Scalars['String'],
  serviceId: Scalars['String'],
  value: Scalars['String'],
};

export type IHeaderInput = {
  id?: Maybe<Scalars['String']>,
  path: Scalars['String'],
  key: Scalars['String'],
  value: Scalars['String'],
  enabled: Scalars['Boolean'],
};

export type IIacExecution = {
   __typename?: 'IACExecution',
  id?: Maybe<Scalars['String']>,
  actionStates?: Maybe<Array<IIacExecutionActionState>>,
  commit?: Maybe<IGitCommit>,
  completedAt?: Maybe<Scalars['Time']>,
  createdAt?: Maybe<Scalars['Time']>,
  errors?: Maybe<Scalars['JSON']>,
  plan?: Maybe<Scalars['JSON']>,
  source?: Maybe<IIacExecutionSource>,
  startedAt?: Maybe<Scalars['Time']>,
  state?: Maybe<IIacExecutionState>,
  updatedAt?: Maybe<Scalars['Time']>,
};

export type IIacExecutionActionState = {
   __typename?: 'IACExecutionActionState',
  state?: Maybe<IIacExecutionState>,
  message?: Maybe<Scalars['String']>,
};

export type IIacExecutionAndSource = {
   __typename?: 'IACExecutionAndSource',
  source?: Maybe<IIacExecutionSource>,
  execution?: Maybe<IIacExecution>,
};

export type IIacExecutionSource = {
   __typename?: 'IACExecutionSource',
  id?: Maybe<Scalars['String']>,
  lastSyncAt?: Maybe<Scalars['Time']>,
  repo?: Maybe<IRepo>,
  branch?: Maybe<Scalars['String']>,
  path?: Maybe<Scalars['String']>,
  status?: Maybe<IIacExecutionSourceStatus>,
  executions?: Maybe<IIacExecutionsPage>,
  resources?: Maybe<Array<IIacManagedResource>>,
};


export type IIacExecutionSourceExecutionsArgs = {
  limit?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['Time']>
};

export enum IIacExecutionSourceStatus {
  Created = 'CREATED',
  Paused = 'PAUSED',
  InSync = 'IN_SYNC',
  Syncing = 'SYNCING',
  Error = 'ERROR'
}

export type IIacExecutionsPage = {
   __typename?: 'IACExecutionsPage',
  hasMore?: Maybe<Scalars['Boolean']>,
  executions?: Maybe<Array<IIacExecution>>,
};

export enum IIacExecutionState {
  Created = 'CREATED',
  Pending = 'PENDING',
  Running = 'RUNNING',
  Error = 'ERROR',
  Success = 'SUCCESS'
}

export type IIacManagedResource = IServer | ICronJob | IDatabase | IEnvGroup;

export type IInvoice = {
   __typename?: 'Invoice',
  id: Scalars['String'],
  total: Scalars['Int'],
  status: Scalars['String'],
  period: IPeriod,
  startDate: Scalars['Time'],
  endDate?: Maybe<Scalars['Time']>,
  invoiceItems: Array<IInvoiceItem>,
};

export type IInvoiceItem = {
   __typename?: 'InvoiceItem',
  id: Scalars['String'],
  invoiceId: Scalars['String'],
  chargeAmount: Scalars['Int'],
  amountChargedToCredit: Scalars['Int'],
  amountChargedToCard: Scalars['Int'],
  serviceType: Scalars['String'],
  rate?: Maybe<Scalars['Int']>,
  duration: Scalars['Int'],
  bandwidthGB: Scalars['Float'],
  name: Scalars['String'],
};

export type IInvoices = {
   __typename?: 'Invoices',
  cursor?: Maybe<Scalars['Int']>,
  invoices: Array<Maybe<IInvoice>>,
  hasMore: Scalars['Boolean'],
};


export type ILogEntry = {
   __typename?: 'LogEntry',
  id: Scalars['String'],
  serviceId: Scalars['String'],
  buildId: Scalars['String'],
  deployId: Scalars['String'],
  timestamp: Scalars['String'],
  text: Scalars['String'],
};

export type IMetrics = {
   __typename?: 'Metrics',
  samples: Array<Maybe<ISampleValue>>,
};

export type IMutation = {
   __typename?: 'Mutation',
  addEnvGroupToService?: Maybe<IEnvGroup>,
  addDiskToServer?: Maybe<IServer>,
  addUserToTeam?: Maybe<IUser>,
  adminLoginAs?: Maybe<IAuthResult>,
  approveIACSync?: Maybe<IIacExecutionAndSource>,
  buildCronJob?: Maybe<IBuild>,
  cancelCronJobRun?: Maybe<ICronJobRun>,
  createCronJob?: Maybe<ICronJob>,
  createCustomDomain?: Maybe<ICustomDomain>,
  createDatabase?: Maybe<IDatabase>,
  createEnvGroup?: Maybe<IEnvGroup>,
  createPassword?: Maybe<IAuthResult>,
  createServer?: Maybe<IServer>,
  createTeam?: Maybe<ITeam>,
  deleteUserAccount: Scalars['Boolean'],
  deleteCronJob: Scalars['Boolean'],
  deleteCustomDomain: Scalars['Boolean'],
  deleteDatabase: Scalars['Boolean'],
  deleteEnvGroup: Scalars['Boolean'],
  deleteDisk: IServer,
  deleteIACExecutionSource: Scalars['Boolean'],
  deleteServer: Scalars['Boolean'],
  deleteTeam: Scalars['Boolean'],
  deployServer?: Maybe<IDeploy>,
  disable2FA: Scalars['Boolean'],
  githubAuth?: Maybe<IGithubAuthResult>,
  gitlabAuth?: Maybe<IGitlabAuthResult>,
  gitlabConnect: Scalars['Boolean'],
  googleAuth?: Maybe<IGoogleAuthResult>,
  grantPermissions: Array<IPermission>,
  inviteAndShare: Array<IPendingPermission>,
  inviteToTeam?: Maybe<IPendingUser>,
  inviteUser: Scalars['Boolean'],
  new2FABackupCodes: Array<Maybe<ITwoFactorBackupCode>>,
  newOTPRequest?: Maybe<IOtpRequest>,
  passwordResetConfirm?: Maybe<IAuthResult>,
  performMaintenance: IDatabase,
  planIACSync?: Maybe<IIacExecutionAndSource>,
  refreshCustomDomainStatus: Scalars['Boolean'],
  removeEnvGroupFromService: Scalars['Boolean'],
  removePendingUserFromTeam: Scalars['Boolean'],
  removeSlackAuth: IOwner,
  removeUserFromTeam: Scalars['Boolean'],
  removeUserGithub?: Maybe<IUser>,
  resendEmailVerificationEmail?: Maybe<IUser>,
  resetPassword: Scalars['Boolean'],
  restoreDiskSnapshot: IServer,
  resumeService: Scalars['Boolean'],
  resumeService1: IService,
  revokeAllPermissions: Array<Scalars['String']>,
  runCronJob: Scalars['Boolean'],
  saveHeaders: Array<Maybe<IHeader>>,
  saveEnvVars: Array<Maybe<IEnvVar>>,
  saveRedirectRules: Array<Maybe<IRedirectRule>>,
  saveSecretFiles: Array<Maybe<IEnvVar>>,
  setIACAutoSync?: Maybe<IIacExecutionAndSource>,
  signIn?: Maybe<IAuthResult>,
  signUp?: Maybe<IAuthResult>,
  slackAuth: IOwner,
  startShell: Scalars['Boolean'],
  suspendService: Scalars['Boolean'],
  suspendService1: IService,
  unsubscribeForever: Scalars['Boolean'],
  updateCard?: Maybe<IOwner>,
  updateCronJobAutoDeploy?: Maybe<ICronJob>,
  updateCronJobBaseDir?: Maybe<ICronJob>,
  updateCronJobBranch?: Maybe<ICronJob>,
  updateCronJobBuildCommand?: Maybe<ICronJob>,
  updateCronJobCommand?: Maybe<ICronJob>,
  updateCronJobDockerfilePath?: Maybe<ICronJob>,
  updateCronJobName?: Maybe<ICronJob>,
  updateCronJobSchedule?: Maybe<ICronJob>,
  updateDatabaseDisplayName?: Maybe<IDatabase>,
  updateDatabasePlan?: Maybe<IDatabase>,
  updateEnvGroupEnvVars: Array<Maybe<IEnvVar>>,
  updateEnvGroupName?: Maybe<IEnvGroup>,
  updateEnvGroupSecretFiles: Array<Maybe<IEnvVar>>,
  updateDisk?: Maybe<IServer>,
  updateOwnerNotificationSetting?: Maybe<IOwner>,
  updateServerAutoDeploy?: Maybe<IServer>,
  updateServerBaseDir?: Maybe<IServer>,
  updateServerBranch?: Maybe<IServer>,
  updateServerBuildCommand?: Maybe<IServer>,
  updateServerDockerfilePath?: Maybe<IServer>,
  updateServerHealthCheckPath?: Maybe<IServer>,
  updateServerInstanceCount?: Maybe<IServer>,
  updateServerName?: Maybe<IServer>,
  updateServerPlan?: Maybe<IServer>,
  updateServerPRPreviewsEnabled?: Maybe<IServer>,
  updateServerStartCommand?: Maybe<IServer>,
  updateServerStaticPublishPath?: Maybe<IServer>,
  updateServiceNotificationSetting: IService,
  updateTeamProfile?: Maybe<ITeam>,
  updateUserNotificationSetting?: Maybe<IUser>,
  updateUserNotifyOnPrUpdate?: Maybe<IUser>,
  updateUserProfile?: Maybe<IUser>,
  verifyEmail?: Maybe<IAuthResult>,
  verifyOTP?: Maybe<IAuthResult>,
  verifyOTPRequest: Scalars['Boolean'],
};


export type IMutationAddEnvGroupToServiceArgs = {
  serviceId: Scalars['String'],
  envGroupId: Scalars['String']
};


export type IMutationAddDiskToServerArgs = {
  serviceId: Scalars['String'],
  diskInput: IDiskInput
};


export type IMutationAddUserToTeamArgs = {
  teamId: Scalars['String'],
  userId: Scalars['String']
};


export type IMutationAdminLoginAsArgs = {
  requestId: Scalars['String']
};


export type IMutationApproveIacSyncArgs = {
  sourceId?: Maybe<Scalars['String']>,
  executionId?: Maybe<Scalars['String']>
};


export type IMutationBuildCronJobArgs = {
  cronJobId: Scalars['String']
};


export type IMutationCancelCronJobRunArgs = {
  cronJobId: Scalars['String'],
  runId: Scalars['String']
};


export type IMutationCreateCronJobArgs = {
  cronJob: ICronJobInput
};


export type IMutationCreateCustomDomainArgs = {
  customDomain: ICustomDomainInput
};


export type IMutationCreateDatabaseArgs = {
  database: IDatabaseInput
};


export type IMutationCreateEnvGroupArgs = {
  name: Scalars['String'],
  envVarInputs: Array<IEnvVarInput>,
  ownerId: Scalars['String']
};


export type IMutationCreatePasswordArgs = {
  password: Scalars['String']
};


export type IMutationCreateServerArgs = {
  server: IServerInput
};


export type IMutationCreateTeamArgs = {
  team: ITeamInput
};


export type IMutationDeleteUserAccountArgs = {
  id: Scalars['String']
};


export type IMutationDeleteCronJobArgs = {
  id: Scalars['String']
};


export type IMutationDeleteCustomDomainArgs = {
  id: Scalars['String']
};


export type IMutationDeleteDatabaseArgs = {
  id: Scalars['String']
};


export type IMutationDeleteEnvGroupArgs = {
  id: Scalars['String']
};


export type IMutationDeleteDiskArgs = {
  serviceId: Scalars['String']
};


export type IMutationDeleteIacExecutionSourceArgs = {
  id: Scalars['String']
};


export type IMutationDeleteServerArgs = {
  id: Scalars['String']
};


export type IMutationDeleteTeamArgs = {
  id: Scalars['String']
};


export type IMutationDeployServerArgs = {
  id: Scalars['String'],
  clearCache?: Maybe<Scalars['Boolean']>
};


export type IMutationDisable2FaArgs = {
  userId: Scalars['String']
};


export type IMutationGithubAuthArgs = {
  accessCode: Scalars['String'],
  userId?: Maybe<Scalars['String']>
};


export type IMutationGitlabAuthArgs = {
  accessCode: Scalars['String'],
  userId?: Maybe<Scalars['String']>
};


export type IMutationGitlabConnectArgs = {
  accessCode: Scalars['String'],
  userId: Scalars['String']
};


export type IMutationGoogleAuthArgs = {
  token: Scalars['String']
};


export type IMutationGrantPermissionsArgs = {
  permissions: Array<IPermissionInput>
};


export type IMutationInviteAndShareArgs = {
  email: Scalars['String'],
  action: Scalars['String'],
  serviceId: Scalars['String']
};


export type IMutationInviteToTeamArgs = {
  email: Scalars['String'],
  teamId: Scalars['String']
};


export type IMutationInviteUserArgs = {
  email: Scalars['String']
};


export type IMutationNew2FaBackupCodesArgs = {
  userId: Scalars['String']
};


export type IMutationNewOtpRequestArgs = {
  userId: Scalars['String']
};


export type IMutationPasswordResetConfirmArgs = {
  email: Scalars['String'],
  token: Scalars['String'],
  password1: Scalars['String'],
  password2: Scalars['String']
};


export type IMutationPerformMaintenanceArgs = {
  databaseID: Scalars['String'],
  at?: Maybe<Scalars['Time']>
};


export type IMutationPlanIacSyncArgs = {
  provider: IGitProvider,
  repoOwner: Scalars['String'],
  repoName: Scalars['String'],
  branch?: Maybe<Scalars['String']>,
  ownerId?: Maybe<Scalars['String']>
};


export type IMutationRefreshCustomDomainStatusArgs = {
  id: Scalars['String']
};


export type IMutationRemoveEnvGroupFromServiceArgs = {
  serviceId: Scalars['String'],
  envGroupId: Scalars['String']
};


export type IMutationRemovePendingUserFromTeamArgs = {
  teamId: Scalars['String'],
  email: Scalars['String']
};


export type IMutationRemoveSlackAuthArgs = {
  ownerId: Scalars['String']
};


export type IMutationRemoveUserFromTeamArgs = {
  teamId: Scalars['String'],
  userId: Scalars['String']
};


export type IMutationResendEmailVerificationEmailArgs = {
  userId: Scalars['String']
};


export type IMutationResetPasswordArgs = {
  email: Scalars['String']
};


export type IMutationRestoreDiskSnapshotArgs = {
  diskId: Scalars['String'],
  snapshotKey: Scalars['String']
};


export type IMutationResumeServiceArgs = {
  id: Scalars['String']
};


export type IMutationResumeService1Args = {
  id: Scalars['String']
};


export type IMutationRevokeAllPermissionsArgs = {
  subjectId: Scalars['String'],
  objectId: Scalars['String']
};


export type IMutationRunCronJobArgs = {
  id: Scalars['String']
};


export type IMutationSaveHeadersArgs = {
  serviceId: Scalars['String'],
  headerInputs: Array<IHeaderInput>
};


export type IMutationSaveEnvVarsArgs = {
  serviceId: Scalars['String'],
  envVarInputs: Array<IEnvVarInput>
};


export type IMutationSaveRedirectRulesArgs = {
  serverId: Scalars['String'],
  rules: Array<IRedirectRuleInput>
};


export type IMutationSaveSecretFilesArgs = {
  serviceId: Scalars['String'],
  fileInputs: Array<IEnvVarInput>
};


export type IMutationSetIacAutoSyncArgs = {
  sourceId: Scalars['String'],
  autoSync: Scalars['Boolean']
};


export type IMutationSignInArgs = {
  email?: Maybe<Scalars['String']>,
  password: Scalars['String']
};


export type IMutationSignUpArgs = {
  signup: ISignupInput
};


export type IMutationSlackAuthArgs = {
  ownerId: Scalars['String'],
  accessCode: Scalars['String'],
  redirect: Scalars['String']
};


export type IMutationStartShellArgs = {
  serviceId: Scalars['String']
};


export type IMutationSuspendServiceArgs = {
  id: Scalars['String']
};


export type IMutationSuspendService1Args = {
  id: Scalars['String']
};


export type IMutationUnsubscribeForeverArgs = {
  email: Scalars['String']
};


export type IMutationUpdateCardArgs = {
  id: Scalars['String'],
  token: Scalars['String'],
  brand: Scalars['String'],
  last4: Scalars['String'],
  country: Scalars['String'],
  region: Scalars['String']
};


export type IMutationUpdateCronJobAutoDeployArgs = {
  id: Scalars['String'],
  autoDeploy: Scalars['Boolean']
};


export type IMutationUpdateCronJobBaseDirArgs = {
  id: Scalars['String'],
  baseDir: Scalars['String']
};


export type IMutationUpdateCronJobBranchArgs = {
  id: Scalars['String'],
  branch: Scalars['String']
};


export type IMutationUpdateCronJobBuildCommandArgs = {
  id: Scalars['String'],
  buildCommand: Scalars['String']
};


export type IMutationUpdateCronJobCommandArgs = {
  id: Scalars['String'],
  command: Scalars['String']
};


export type IMutationUpdateCronJobDockerfilePathArgs = {
  id: Scalars['String'],
  dockerfilePath: Scalars['String']
};


export type IMutationUpdateCronJobNameArgs = {
  id: Scalars['String'],
  name: Scalars['String']
};


export type IMutationUpdateCronJobScheduleArgs = {
  id: Scalars['String'],
  schedule: Scalars['String']
};


export type IMutationUpdateDatabaseDisplayNameArgs = {
  id: Scalars['String'],
  name: Scalars['String']
};


export type IMutationUpdateDatabasePlanArgs = {
  id: Scalars['String'],
  plan: Scalars['String']
};


export type IMutationUpdateEnvGroupEnvVarsArgs = {
  id: Scalars['String'],
  envVarInputs: Array<IEnvVarInput>
};


export type IMutationUpdateEnvGroupNameArgs = {
  id: Scalars['String'],
  name: Scalars['String'],
  ownerId?: Maybe<Scalars['String']>
};


export type IMutationUpdateEnvGroupSecretFilesArgs = {
  id: Scalars['String'],
  fileInputs: Array<IEnvVarInput>
};


export type IMutationUpdateDiskArgs = {
  serviceId: Scalars['String'],
  input: IDiskInput
};


export type IMutationUpdateOwnerNotificationSettingArgs = {
  id: Scalars['String'],
  notificationSetting: ISetting
};


export type IMutationUpdateServerAutoDeployArgs = {
  id: Scalars['String'],
  autoDeploy: Scalars['Boolean']
};


export type IMutationUpdateServerBaseDirArgs = {
  id: Scalars['String'],
  baseDir: Scalars['String']
};


export type IMutationUpdateServerBranchArgs = {
  id: Scalars['String'],
  branch: Scalars['String']
};


export type IMutationUpdateServerBuildCommandArgs = {
  id: Scalars['String'],
  buildCommand: Scalars['String']
};


export type IMutationUpdateServerDockerfilePathArgs = {
  id: Scalars['String'],
  dockerfilePath: Scalars['String']
};


export type IMutationUpdateServerHealthCheckPathArgs = {
  id: Scalars['String'],
  healthCheckPath?: Maybe<Scalars['String']>
};


export type IMutationUpdateServerInstanceCountArgs = {
  id: Scalars['String'],
  count: Scalars['Int']
};


export type IMutationUpdateServerNameArgs = {
  id: Scalars['String'],
  name: Scalars['String']
};


export type IMutationUpdateServerPlanArgs = {
  id: Scalars['String'],
  plan: Scalars['String']
};


export type IMutationUpdateServerPrPreviewsEnabledArgs = {
  id: Scalars['String'],
  enabled: Scalars['Boolean']
};


export type IMutationUpdateServerStartCommandArgs = {
  id: Scalars['String'],
  startCommand: Scalars['String']
};


export type IMutationUpdateServerStaticPublishPathArgs = {
  id: Scalars['String'],
  staticPublishPath: Scalars['String']
};


export type IMutationUpdateServiceNotificationSettingArgs = {
  id: Scalars['String'],
  notificationSetting: ISetting
};


export type IMutationUpdateTeamProfileArgs = {
  id: Scalars['String'],
  profileInput: ITeamProfileInput
};


export type IMutationUpdateUserNotificationSettingArgs = {
  id: Scalars['String'],
  notificationSetting: ISetting
};


export type IMutationUpdateUserNotifyOnPrUpdateArgs = {
  id: Scalars['String'],
  notificationSetting: ISetting
};


export type IMutationUpdateUserProfileArgs = {
  id: Scalars['String'],
  profileInput: IUserProfileInput
};


export type IMutationVerifyEmailArgs = {
  token: Scalars['String']
};


export type IMutationVerifyOtpArgs = {
  userId: Scalars['String'],
  code: Scalars['String']
};


export type IMutationVerifyOtpRequestArgs = {
  requestId: Scalars['String'],
  otp: Scalars['String']
};

export type IObject = IServer | ICronJob;

export type IOomKilledData = {
   __typename?: 'OOMKilledData',
  memoryRequest?: Maybe<Scalars['String']>,
  memoryLimit?: Maybe<Scalars['String']>,
};

export type IOomKillToast = IToast & {
   __typename?: 'OOMKillToast',
  toast: Scalars['String'],
  url?: Maybe<Scalars['String']>,
};

export type IOtpRequest = {
   __typename?: 'OTPRequest',
  id: Scalars['String'],
  key: Scalars['String'],
  qrCode: Scalars['String'],
};

export type IOwner = {
   __typename?: 'Owner',
  id: Scalars['String'],
  email: Scalars['String'],
  user?: Maybe<IUser>,
  team?: Maybe<ITeam>,
  balance: Scalars['Int'],
  cardBrand: Scalars['String'],
  cardLast4: Scalars['String'],
  canBill: Scalars['Boolean'],
  notifyOnFail: ISetting,
  slackConnected: Scalars['Boolean'],
};

export type IPendingPermission = {
   __typename?: 'PendingPermission',
  email: Scalars['String'],
  action: Scalars['String'],
};

export type IPendingUser = {
   __typename?: 'PendingUser',
  email: Scalars['String'],
};

export type IPeriod = {
   __typename?: 'Period',
  year: Scalars['Int'],
  month: Scalars['String'],
};

export type IPermission = {
   __typename?: 'Permission',
  subject: ISubject,
  action: Scalars['String'],
  object: IObject,
};

export type IPermissionInput = {
  subjectId: Scalars['String'],
  action: Scalars['String'],
  objectId: Scalars['String'],
};

export type IPlan = {
   __typename?: 'Plan',
  name: Scalars['String'],
  price: Scalars['Int'],
};

export type IPlanChanged = IServiceEvent & {
   __typename?: 'PlanChanged',
  id: Scalars['String'],
  timestamp: Scalars['Time'],
  service: IService,
  from: Scalars['String'],
  to: Scalars['String'],
};

export type IPlanData = {
   __typename?: 'PlanData',
  id: Scalars['String'],
  name: Scalars['String'],
  price: Scalars['Int'],
  cpu: Scalars['String'],
  mem: Scalars['String'],
  size: Scalars['String'],
  needsPaymentInfo: Scalars['Boolean'],
};

export type IPullRequest = {
   __typename?: 'PullRequest',
  id: Scalars['String'],
  providerPullRequestId: Scalars['String'],
  number: Scalars['String'],
  url: Scalars['String'],
  title: Scalars['String'],
  userLogin: Scalars['String'],
  userURL: Scalars['String'],
  createdAt: Scalars['Time'],
  updatedAt: Scalars['Time'],
};

export type IPullRequestServer = {
   __typename?: 'PullRequestServer',
  server: IServer,
  pullRequest: IPullRequest,
};

export type IQuery = {
   __typename?: 'Query',
  allEnvs: Array<Maybe<IEnv>>,
  build?: Maybe<IBuild>,
  buildLogs: Array<Maybe<ILogEntry>>,
  buildsForCronJob: Array<Maybe<IBuild>>,
  cannyToken: Scalars['String'],
  cronJob?: Maybe<ICronJob>,
  cronJobRuns: Array<Maybe<ICronJobRun>>,
  customDomains: Array<Maybe<ICustomDomain>>,
  database?: Maybe<IDatabase>,
  databasePlans: Array<IPlanData>,
  databasesForOwner: Array<Maybe<IDatabase>>,
  databasesForUser: Array<Maybe<IDatabase>>,
  deploy?: Maybe<IDeploy>,
  deployLogs: Array<Maybe<ILogEntry>>,
  deploys: Array<Maybe<IDeploy>>,
  envGroup?: Maybe<IEnvGroup>,
  envGroupNameExists: Scalars['Boolean'],
  envGroupsForService: Array<Maybe<IEnvGroup>>,
  envGroupsForUser: Array<Maybe<IEnvGroup>>,
  envGroupsForOwner: Array<Maybe<IEnvGroup>>,
  envVarsForService: Array<Maybe<IEnvVar>>,
  gitRepo?: Maybe<IGitRepo>,
  headersForService: Array<Maybe<IHeader>>,
  iacExecution?: Maybe<IIacExecution>,
  iacExecutionSource?: Maybe<IIacExecutionSource>,
  iacExecutionSources?: Maybe<Array<IIacExecutionSource>>,
  invoice?: Maybe<IInvoice>,
  invoicesForOwner: IInvoices,
  newPaidServiceAllowed: Scalars['Boolean'],
  owner?: Maybe<IOwner>,
  pullRequestServers?: Maybe<Array<Maybe<IPullRequestServer>>>,
  redirectRules: Array<Maybe<IRedirectRule>>,
  server?: Maybe<IServer>,
  serverPlans: Array<IPlanData>,
  service?: Maybe<IService>,
  serviceLogs: Array<Maybe<ILogEntry>>,
  serviceMetrics: IServiceMetrics,
  servicesForEnvGroup: Array<IService>,
  servicesForUser: Array<IService>,
  servicesForOwner: Array<IService>,
  team?: Maybe<ITeam>,
  teamNameExistsForEmail: Scalars['Boolean'],
  teamsForUser: Array<Maybe<ITeam>>,
  twoFactorBackupCodes: Array<Maybe<ITwoFactorBackupCode>>,
  unbilledChargesForOwner: Array<ICharge>,
  user?: Maybe<IUser>,
  userRepoList: Array<IGitRepo>,
  validatePasswordResetToken: Scalars['String'],
  testToast: Scalars['Boolean'],
  serviceEvents: IServiceEventsResult,
};


export type IQueryBuildArgs = {
  id: Scalars['String'],
  serviceId?: Maybe<Scalars['String']>
};


export type IQueryBuildLogsArgs = {
  buildId: Scalars['String'],
  serviceId?: Maybe<Scalars['String']>
};


export type IQueryBuildsForCronJobArgs = {
  cronJobId: Scalars['String'],
  limit: Scalars['Int']
};


export type IQueryCannyTokenArgs = {
  userId: Scalars['String']
};


export type IQueryCronJobArgs = {
  id: Scalars['String']
};


export type IQueryCronJobRunsArgs = {
  cronJobId: Scalars['String']
};


export type IQueryCustomDomainsArgs = {
  serverId: Scalars['String']
};


export type IQueryDatabaseArgs = {
  id: Scalars['String']
};


export type IQueryDatabasesForOwnerArgs = {
  ownerId: Scalars['String']
};


export type IQueryDatabasesForUserArgs = {
  userId: Scalars['String']
};


export type IQueryDeployArgs = {
  id: Scalars['String']
};


export type IQueryDeployLogsArgs = {
  deployId: Scalars['String']
};


export type IQueryDeploysArgs = {
  serverId: Scalars['String'],
  limit?: Maybe<Scalars['Int']>
};


export type IQueryEnvGroupArgs = {
  id: Scalars['String']
};


export type IQueryEnvGroupNameExistsArgs = {
  name: Scalars['String'],
  ownerId?: Maybe<Scalars['String']>
};


export type IQueryEnvGroupsForServiceArgs = {
  serviceId: Scalars['String']
};


export type IQueryEnvGroupsForUserArgs = {
  userId: Scalars['String']
};


export type IQueryEnvGroupsForOwnerArgs = {
  ownerId: Scalars['String']
};


export type IQueryEnvVarsForServiceArgs = {
  serviceId: Scalars['String'],
  isFile: Scalars['Boolean']
};


export type IQueryGitRepoArgs = {
  id?: Maybe<Scalars['String']>,
  provider: IGitProvider,
  ownerName?: Maybe<Scalars['String']>,
  repoName?: Maybe<Scalars['String']>
};


export type IQueryHeadersForServiceArgs = {
  serviceId: Scalars['String']
};


export type IQueryIacExecutionArgs = {
  id: Scalars['String']
};


export type IQueryIacExecutionSourceArgs = {
  id: Scalars['String']
};


export type IQueryIacExecutionSourcesArgs = {
  ownerId?: Maybe<Scalars['String']>
};


export type IQueryInvoiceArgs = {
  id: Scalars['String'],
  ownerId?: Maybe<Scalars['String']>
};


export type IQueryInvoicesForOwnerArgs = {
  ownerId: Scalars['String'],
  cursor?: Maybe<Scalars['Int']>
};


export type IQueryNewPaidServiceAllowedArgs = {
  userId: Scalars['String']
};


export type IQueryOwnerArgs = {
  ownerId: Scalars['String']
};


export type IQueryPullRequestServersArgs = {
  serverId: Scalars['String']
};


export type IQueryRedirectRulesArgs = {
  serverId: Scalars['String']
};


export type IQueryServerArgs = {
  id: Scalars['String']
};


export type IQueryServiceArgs = {
  id: Scalars['String']
};


export type IQueryServiceLogsArgs = {
  serviceId: Scalars['String']
};


export type IQueryServiceMetricsArgs = {
  serviceId: Scalars['String'],
  historyMinutes: Scalars['Int'],
  step: Scalars['Int']
};


export type IQueryServicesForEnvGroupArgs = {
  envGroupId: Scalars['String']
};


export type IQueryServicesForUserArgs = {
  userId?: Maybe<Scalars['String']>
};


export type IQueryServicesForOwnerArgs = {
  ownerId: Scalars['String'],
  includeSharedServices?: Maybe<Scalars['Boolean']>
};


export type IQueryTeamArgs = {
  teamId: Scalars['String']
};


export type IQueryTeamNameExistsForEmailArgs = {
  name: Scalars['String'],
  email: Scalars['String']
};


export type IQueryTeamsForUserArgs = {
  userId: Scalars['String']
};


export type IQueryTwoFactorBackupCodesArgs = {
  userId: Scalars['String']
};


export type IQueryUnbilledChargesForOwnerArgs = {
  ownerId: Scalars['String']
};


export type IQueryUserArgs = {
  email: Scalars['String']
};


export type IQueryUserRepoListArgs = {
  id: Scalars['String']
};


export type IQueryValidatePasswordResetTokenArgs = {
  token: Scalars['String']
};


export type IQueryTestToastArgs = {
  id: Scalars['String']
};


export type IQueryServiceEventsArgs = {
  serviceId: Scalars['String'],
  before?: Maybe<Scalars['Time']>,
  limit?: Maybe<Scalars['Int']>
};

export type IRedirectRule = {
   __typename?: 'RedirectRule',
  id: Scalars['String'],
  sequence: Scalars['Int'],
  source: Scalars['String'],
  destination: Scalars['String'],
  enabled: Scalars['Boolean'],
  httpStatus: Scalars['Int'],
  createdAt: Scalars['Time'],
  override: Scalars['Boolean'],
  serverId: Scalars['String'],
};

export type IRedirectRuleInput = {
  id?: Maybe<Scalars['String']>,
  source: Scalars['String'],
  destination: Scalars['String'],
  enabled: Scalars['Boolean'],
  override?: Maybe<Scalars['Boolean']>,
  httpStatus?: Maybe<Scalars['Int']>,
};

export type IRepo = {
   __typename?: 'Repo',
  id: Scalars['String'],
  name: Scalars['String'],
  provider: IGitProvider,
  providerId: Scalars['String'],
  ownerName: Scalars['String'],
  webURL: Scalars['String'],
  isPrivate: Scalars['Boolean'],
  isFork: Scalars['Boolean'],
};

export type IRepoInput = {
  name: Scalars['String'],
  ownerName: Scalars['String'],
  webURL: Scalars['String'],
  isFork: Scalars['Boolean'],
  isPrivate: Scalars['Boolean'],
  provider: IGitProvider,
  providerId: Scalars['String'],
  defaultBranchName: Scalars['String'],
};

export type ISampleValue = {
   __typename?: 'SampleValue',
  time: Scalars['Time'],
  memory?: Maybe<Scalars['Float']>,
  cpu?: Maybe<Scalars['Int']>,
};

export type IServer = IService & {
   __typename?: 'Server',
  id: Scalars['String'],
  autoDeploy: Scalars['Boolean'],
  baseDir?: Maybe<Scalars['String']>,
  buildCommand: Scalars['String'],
  canBill: Scalars['Boolean'],
  createdAt: Scalars['Time'],
  deletedAt?: Maybe<Scalars['Time']>,
  deploy?: Maybe<IDeploy>,
  deployKey?: Maybe<Scalars['String']>,
  disk?: Maybe<IDisk>,
  dockerfilePath?: Maybe<Scalars['String']>,
  env: IEnv,
  extraInstances: Scalars['Int'],
  healthCheckPath: Scalars['String'],
  isPrivate?: Maybe<Scalars['Boolean']>,
  isWorker: Scalars['Boolean'],
  metrics: IMetrics,
  bandwidthMB: IBandwidth,
  name: Scalars['String'],
  notifyOnFail: ISetting,
  openPorts?: Maybe<Scalars['JSON']>,
  owner: IOwner,
  parentServer?: Maybe<IServer>,
  pendingPermissions: Array<IPendingPermission>,
  plan: IPlan,
  prPreviewsEnabled: Scalars['Boolean'],
  pullRequestId: Scalars['String'],
  referentPermissions: Array<IPermission>,
  repo: IRepo,
  slug: Scalars['String'],
  sourceBranch: Scalars['String'],
  startCommand: Scalars['String'],
  state: Scalars['String'],
  staticPublishPath: Scalars['String'],
  suspenders: Array<Scalars['String']>,
  type: Scalars['String'],
  updatedAt: Scalars['Time'],
  url: Scalars['String'],
  user: IUser,
  userFacingType: Scalars['String'],
  userFacingTypeSlug: Scalars['String'],
  verifiedDomains?: Maybe<Array<Scalars['String']>>,
};


export type IServerMetricsArgs = {
  historyMinutes?: Maybe<Scalars['Int']>,
  step?: Maybe<Scalars['Int']>
};

export type IServerAvailable = IServiceEvent & {
   __typename?: 'ServerAvailable',
  id: Scalars['String'],
  service: IService,
  timestamp: Scalars['Time'],
};

export type IServerFailed = IServiceEvent & {
   __typename?: 'ServerFailed',
  id: Scalars['String'],
  service: IService,
  timestamp: Scalars['Time'],
  reason?: Maybe<IFailureReason>,
};

export type IServerInput = {
  name: Scalars['String'],
  repo: IRepoInput,
  envId: Scalars['String'],
  buildCommand: Scalars['String'],
  branch: Scalars['String'],
  autoDeploy?: Maybe<Scalars['Boolean']>,
  envVars?: Maybe<Array<IEnvVarInput>>,
  startCommand?: Maybe<Scalars['String']>,
  staticPublishPath?: Maybe<Scalars['String']>,
  healthCheckPath?: Maybe<Scalars['String']>,
  isWorker?: Maybe<Scalars['Boolean']>,
  isPrivate?: Maybe<Scalars['Boolean']>,
  baseDir?: Maybe<Scalars['String']>,
  dockerfilePath?: Maybe<Scalars['String']>,
  plan?: Maybe<Scalars['String']>,
  disk?: Maybe<IDiskInput>,
  ownerId: Scalars['String'],
};

export type IService = {
  id: Scalars['String'],
  autoDeploy: Scalars['Boolean'],
  baseDir?: Maybe<Scalars['String']>,
  buildCommand: Scalars['String'],
  canBill: Scalars['Boolean'],
  createdAt: Scalars['Time'],
  dockerfilePath?: Maybe<Scalars['String']>,
  env: IEnv,
  metrics: IMetrics,
  name: Scalars['String'],
  notifyOnFail: ISetting,
  owner: IOwner,
  pendingPermissions: Array<IPendingPermission>,
  plan: IPlan,
  referentPermissions: Array<IPermission>,
  repo: IRepo,
  slug: Scalars['String'],
  sourceBranch: Scalars['String'],
  state: Scalars['String'],
  suspenders: Array<Scalars['String']>,
  type: Scalars['String'],
  updatedAt: Scalars['Time'],
  user: IUser,
  userFacingType: Scalars['String'],
  userFacingTypeSlug: Scalars['String'],
};


export type IServiceMetricsArgs = {
  historyMinutes?: Maybe<Scalars['Int']>,
  step?: Maybe<Scalars['Int']>
};

export type IServiceEvent = {
  id: Scalars['String'],
  timestamp: Scalars['Time'],
  service: IService,
};

export type IServiceEventsResult = {
   __typename?: 'ServiceEventsResult',
  hasMore: Scalars['Boolean'],
  events: Array<IServiceEvent>,
};

export type IServiceMetrics = {
   __typename?: 'ServiceMetrics',
  samples: Array<Maybe<ISampleValue>>,
};

export type IServiceResumed = IServiceEvent & {
   __typename?: 'ServiceResumed',
  id: Scalars['String'],
  timestamp: Scalars['Time'],
  service: IService,
};

export type IServiceSuspended = IServiceEvent & {
   __typename?: 'ServiceSuspended',
  id: Scalars['String'],
  timestamp: Scalars['Time'],
  service: IService,
};

export enum ISetting {
  Default = 'DEFAULT',
  Notify = 'NOTIFY',
  Ignore = 'IGNORE'
}

export type ISignupInput = {
  email: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  githubId?: Maybe<Scalars['String']>,
  githubToken?: Maybe<Scalars['String']>,
  googleId?: Maybe<Scalars['String']>,
  gitlabId?: Maybe<Scalars['String']>,
  inviteCode?: Maybe<Scalars['String']>,
};

export type ISubject = IUser;

export type ISubscription = {
   __typename?: 'Subscription',
  buildLogAdded?: Maybe<ILogEntry>,
  buildsForCronJob?: Maybe<IBuild>,
  cronJobRuns?: Maybe<ICronJobRun>,
  database?: Maybe<IDatabase>,
  deployCreated?: Maybe<IDeploy>,
  deployUpdated?: Maybe<IDeploy>,
  iacExecution?: Maybe<IIacExecution>,
  iacExecutions?: Maybe<IIacExecution>,
  pullRequestServerCreated?: Maybe<IPullRequestServer>,
  pullRequestServerCreatedOrDeleted?: Maybe<IPullRequestServer>,
  serviceLogAdded?: Maybe<ILogEntry>,
  serviceSuspension?: Maybe<ISuspensionInfo>,
  serviceUpdated: IService,
  toast?: Maybe<IToast>,
  serviceEvents?: Maybe<IServiceEvent>,
};


export type ISubscriptionBuildLogAddedArgs = {
  buildId: Scalars['String'],
  serviceId?: Maybe<Scalars['String']>
};


export type ISubscriptionBuildsForCronJobArgs = {
  cronJobId: Scalars['String']
};


export type ISubscriptionCronJobRunsArgs = {
  cronJobId: Scalars['String']
};


export type ISubscriptionDatabaseArgs = {
  id: Scalars['String']
};


export type ISubscriptionDeployCreatedArgs = {
  serverId: Scalars['String']
};


export type ISubscriptionDeployUpdatedArgs = {
  deployId: Scalars['String']
};


export type ISubscriptionIacExecutionArgs = {
  id: Scalars['String']
};


export type ISubscriptionIacExecutionsArgs = {
  sourceId: Scalars['String']
};


export type ISubscriptionPullRequestServerCreatedArgs = {
  serverId: Scalars['String']
};


export type ISubscriptionPullRequestServerCreatedOrDeletedArgs = {
  serverId: Scalars['String']
};


export type ISubscriptionServiceLogAddedArgs = {
  serviceId: Scalars['String']
};


export type ISubscriptionServiceSuspensionArgs = {
  serviceId: Scalars['String']
};


export type ISubscriptionServiceUpdatedArgs = {
  id: Scalars['String']
};


export type ISubscriptionServiceEventsArgs = {
  serviceId: Scalars['String']
};

export type ISuggestion = {
   __typename?: 'Suggestion',
  framework?: Maybe<Scalars['String']>,
  environment?: Maybe<Scalars['String']>,
  buildCommand?: Maybe<Scalars['String']>,
  startCommand?: Maybe<Scalars['String']>,
  publishPath?: Maybe<Scalars['String']>,
};

export type ISuspenderAdded = IServiceEvent & {
   __typename?: 'SuspenderAdded',
  id: Scalars['String'],
  timestamp: Scalars['Time'],
  service: IService,
  actor: Scalars['String'],
  suspendedByUser?: Maybe<IUser>,
};

export type ISuspenderRemoved = IServiceEvent & {
   __typename?: 'SuspenderRemoved',
  id: Scalars['String'],
  timestamp: Scalars['Time'],
  service: IService,
  actor: Scalars['String'],
  resumedByUser?: Maybe<IUser>,
};

export type ISuspensionInfo = {
   __typename?: 'SuspensionInfo',
  id: Scalars['String'],
  state: Scalars['String'],
  suspenders: Array<Scalars['String']>,
};

export type ITeam = {
   __typename?: 'Team',
  id: Scalars['String'],
  name: Scalars['String'],
  email: Scalars['String'],
  users: Array<Maybe<IUser>>,
  pendingUsers: Array<Maybe<IPendingUser>>,
};

export type ITeamInput = {
  name: Scalars['String'],
  email: Scalars['String'],
  transfer: Scalars['Boolean'],
  card?: Maybe<ICardInput>,
};

export type ITeamProfileInput = {
  name: Scalars['String'],
  email: Scalars['String'],
};

export type ITestToast = IToast & {
   __typename?: 'TestToast',
  toast: Scalars['String'],
};


export type IToast = {
  toast: Scalars['String'],
};

export type ITwoFactorBackupCode = {
   __typename?: 'TwoFactorBackupCode',
  id: Scalars['String'],
  code: Scalars['String'],
};

export type IUser = {
   __typename?: 'User',
  active: Scalars['Boolean'],
  balance: Scalars['Int'],
  canBill: Scalars['Boolean'],
  cardBrand: Scalars['String'],
  cardLast4: Scalars['String'],
  createdAt: Scalars['Time'],
  email: Scalars['String'],
  featureFlags: Array<Maybe<Scalars['String']>>,
  githubId: Scalars['String'],
  gitlabId: Scalars['String'],
  id: Scalars['String'],
  name: Scalars['String'],
  notifyOnFail: ISetting,
  notifyOnPrUpdate: ISetting,
  otpEnabled: Scalars['Boolean'],
  passwordExists: Scalars['Boolean'],
};

export type IUserProfileInput = {
  name: Scalars['String'],
};
