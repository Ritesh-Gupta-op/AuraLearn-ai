import { exec } from 'child_process';

export const compressForLowBandwidth = (inputPath, outputPath) => {
  // Exact FFmpeg command targeting 240p at 300kbps for low-bandwidth mobile
  const command = `ffmpeg -i ${inputPath} -vf "scale=426:240" -c:v libx264 -b:v 300k -c:a aac -b:a 64k -f mp4 ${outputPath}`;
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(outputPath);
    });
  });
};

export const convertToHLS = (inputPath, outputM3u8Path) => {
  // FFmpeg command to segment into HLS playlist (.m3u8) for adaptive streaming
  const command = `ffmpeg -i ${inputPath} -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${outputM3u8Path}`;
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(outputM3u8Path);
    });
  });
};
