<template>
	<table style="width: 100%; border: 0;">
		<tr>
			<td align="center">
				<table class="checking-table">
					<thead>
						<tr>
							<th width="600" align="center">Check Application Item</th>
							<th width="120" style="text-align: center;">Result</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Installed Docker (version >= 17.06.2)</td>
							<td style="text-align: center;"><i :class="getStatusIcon('docker')"></i></td>
						</tr>
						<tr>
							<td>Installed Docker Composer (version >= 1.14.0)</td>
							<td style="text-align: center;"><i :class="getStatusIcon('composer')"></i></td>
						</tr>
						<tr>
							<td>Installed Golang (version >= 1.11.0)</td>
							<td style="text-align: center;"><i :class="getStatusIcon('go')"></i></td>
						</tr>
						<tr>
							<td>Installed python (Only Support 2.7.*)</td>
							<td style="text-align: center;"><i :class="getStatusIcon('python')"></i></td>
						</tr>
						<tr>
							<td>Installed Node.js (version >= 8.9.0)</td>
							<td style="text-align: center;"><i :class="getStatusIcon('nodejs')"></i></td>
						</tr>
						<tr>
							<td colspan="2" style="text-align: right; padding: 10px;">
								<el-button type="primary" @click="startCheck">Start Checking</el-button>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</table>
</template>

<script>
import EnvGw from '@/api/env.client.gw';

export default {
  data() {
    return {
      checkStatus: {
        docker: 'pending',
        composer: 'pending',
        go: 'pending',
        python: 'pending',
        nodejs: 'pending'
      }
    };
  },
  methods: {
    getStatusIcon: function(key) {
      return {
        pending: 'el-icon-question gray',
        checking: 'el-icon-loading blue',
        success: 'el-icon-success green',
        fail: 'el-icon-error red'
      }[this.checkStatus[key]];
    },
    startCheck: async function() {
      for (const key in this.checkStatus) {
				this.checkStatus[key] = 'checking';
        const res = await EnvGw.checkAppVersion(key);
				this.checkStatus[key] = (res.data.result == 'success' ? 'success' : 'fail');
      }
    }
  }
};
</script>

<style scoped>
.init-network {
  width: 100%;
  text-align: center;
}

.checking-table {
  margin-top: 100px;
  border-collapse: collapse;
}

.checking-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.checking-table td,
.checking-table th {
  border: 1px solid #ddd;
  padding: 8px;
}

.checking-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}

.checking-table i {
  font-size: 32px;
  color: gray;
}

i.gray {
  color: gray;
}

i.red {
  color: red;
}

i.green {
  color: green;
}

i.blue {
  color: blue;
}
</style>

