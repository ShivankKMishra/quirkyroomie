export const generatePunishment = (complaintType) => {
    const punishments = {
      Noise: 'You owe everyone samosas for blasting loud music at 2 AM.',
      Cleanliness: 'You’re making chai for everyone for a week for not cleaning the dishes.',
      Bills: 'You’re paying for the next flat dinner for forgetting to pay the bills.',
      Pets: 'You’re cleaning the flat for a month for not taking care of your pet.',
    };
    return punishments[complaintType] || 'You’re on cleanup duty for a week.';
  };