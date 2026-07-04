import type { LocalizationResource } from '@clerk/types'

const commonTexts = {
  signIn: {
    phoneCode: {
      title: 'Telefoningizni tekshiring',
      subtitle: '"{{applicationName}}"da ishlashni davom ettirish uchun',
      formTitle: 'Tekshiruv kodi',
      formSubtitle: 'Telefoningizga yuborilgan tekshiruv kodini kiriting',
      resendButton: 'Kodni qayta yuborish',
    },
  },
} as const

export const uzUZ: LocalizationResource = {
  locale: 'uz-UZ',

  socialButtonsBlockButton: '{{provider|titleize}} orqali davom etish',
  dividerText: 'yoki',

  formFieldLabel__emailAddress: 'Pochta',
  formFieldLabel__emailAddresses: 'Pochta manzillari',
  formFieldLabel__phoneNumber: 'Telefon raqami',
  formFieldLabel__username: 'Foydalanuvchi nomi',
  formFieldLabel__emailAddress_username: 'Pochta yoki foydalanuvchi nomi',
  formFieldLabel__password: 'Parol',
  formFieldLabel__currentPassword: 'Hozirgi parol',
  formFieldLabel__newPassword: 'Yangi parol',
  formFieldLabel__confirmPassword: 'Parolni tasdiqlang',
  formFieldLabel__signOutOfOtherSessions: 'Boshqa qurilmalardan chiqish',
  formFieldLabel__firstName: 'Ism',
  formFieldLabel__lastName: 'Familiya',
  formFieldLabel__backupCode: 'Qayta tiklash kodi',
  formFieldLabel__organizationName: 'Tashkilot nomi',
  formFieldLabel__role: 'Rol',

  formFieldInputPlaceholder__emailAddresses:
    "Bitta yoki bir nechta pochta manzillarini vergul yoki bo'sh joy bilan kiriting",

  formFieldError__notMatchingPasswords: 'Parollar mos kelmadi.',

  formFieldAction__forgotPassword: 'Parolingizni unutdingizmi?',

  formButtonPrimary: 'Davom etish',
  signInEnterPasswordTitle: 'Parolni kiriting',
  backButton: 'Orqaga',

  footerActionLink__useAnotherMethod: 'Boshqa usulni ishlatish',

  badge__primary: 'Asosiy',
  badge__thisDevice: 'Bu qurilma',
  badge__userDevice: 'Foydalanuvchi qurilmasi',
  badge__unverified: 'Tasdiqlanmagan',
  badge__requiresAction: 'Amal talab qilinadi',
  badge__you: 'Siz',

  footerPageLink__help: 'Yordam',
  footerPageLink__privacy: 'Maxfiylik',
  footerPageLink__terms: 'Shartlar',

  paginationButton__previous: 'Oldingi',
  paginationButton__next: 'Keyingi',

  paginationRowText__displaying: "Ko'rsatilmoqda",
  paginationRowText__of: 'dan',

  membershipRole__admin: 'Administrator',
  membershipRole__basicMember: "A'zo",
  membershipRole__guestMember: 'Mehmon',

  signUp: {
    start: {
      title: 'Hisob yaratish',
      subtitle: '"{{applicationName}}"da ishlashni davom ettirish uchun',
      actionText: 'Allaqachon akkauntingiz bormi?',
      actionLink: 'Kirish',
    },
  },

  signIn: {
    start: {
      title: 'Kirish',
      subtitle: '"{{applicationName}}"da ishlashni davom ettirish uchun',
      actionText: "Akkauntingiz yo'qmi?",
      actionLink: "Ro'yxatdan o'tish",
    },

    phoneCode: {
      ...commonTexts.signIn.phoneCode,
    },
  },

  userButton: {
    action__manageAccount: 'Hisobni boshqarish',
    action__signOut: 'Chiqish',
    action__signOutAll: 'Barcha qurilmalardan chiqish',
    action__addAccount: "Hisob qo'shish",
  },

  organizationSwitcher: {
    personalWorkspace: 'Shaxsiy ish joyi',
    notSelected: 'Tashkilot tanlanmagan',
    action__createOrganization: 'Tashkilot yaratish',
    action__manageOrganization: 'Tashkilotni boshqarish',
  },

  dates: {
    previous6Days:
      "O'tgan {{ date | weekday('uz-UZ','long') }} {{ date | timeString('uz-UZ') }} da",
    lastDay: "Kecha {{ date | timeString('uz-UZ') }} da",
    sameDay: "Bugun {{ date | timeString('uz-UZ') }} da",
    nextDay: "Ertaga {{ date | timeString('uz-UZ') }} da",
    next6Days:
      "{{ date | weekday('uz-UZ','long') }} {{ date | timeString('uz-UZ') }} da",
    numeric: "{{ date | numeric('uz-UZ') }}",
  },
} as const
