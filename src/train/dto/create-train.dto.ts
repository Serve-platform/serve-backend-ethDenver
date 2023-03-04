export class CreateTrainDto {
  // 탑승 지하철
  trainLocation: string;
  // 탑승 호선
  trainLine: string;
  // 탑승 지하철 번호
  trainUuid: string;
  // 탑승 지하철 문 번호
  doorNumber: string;
}
