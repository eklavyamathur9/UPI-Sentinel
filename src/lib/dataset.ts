export interface GenuineApp {
  name: string;
  package_name: string;
  signing_sha256: string;
}

export const genuineApps: GenuineApp[] = [
  {
    name: 'Google Pay (Tez)',
    package_name: 'com.google.android.apps.nbu.paisa.user',
    signing_sha256: 'F0:FD:6C:5B:41:0F:25:CB:25:C3:B5:33:46:C8:97:2F:AE:30:F8:EE:74:11:DF:91:04:80:AD:6B:2D:60:DB:83',
  },
  {
    name: 'PhonePe',
    package_name: 'com.phonepe.app',
    signing_sha256: '5A:88:F6:16:35:E5:A9:37:A6:44:81:4F:08:44:A2:38:A6:03:3D:28:13:95:6B:45:94:C3:57:F5:4A:27:35:53',
  },
  {
    name: 'Paytm',
    package_name: 'net.one97.paytm',
    signing_sha256: 'D4:A8:1F:03:4A:CA:74:36:29:08:B4:85:2B:60:6C:5D:8A:E9:99:99:99:C9:92:43:40:02:82:84:A8:71:0D:37',
  },
  {
    name: 'BHIM',
    package_name: 'in.org.npci.upiapp',
    signing_sha256: '7E:46:1A:87:28:B6:B7:4B:9B:44:C7:E2:49:19:14:14:1A:1E:6A:3A:4B:8A:4F:33:5D:70:93:74:3C:D3:23:6A',
  },
];
